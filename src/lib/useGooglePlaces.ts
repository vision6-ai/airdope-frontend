import { useEffect, useState, useRef } from "react";

interface AddressComponents {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export function useGoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
      setError("Google Maps API key not configured");
      return;
    }

    if (window.google?.maps?.places) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => setIsLoaded(true);
    script.onerror = () => setError("Failed to load Google Maps");

    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        `script[src^="https://maps.googleapis.com/maps/api/js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return { isLoaded, error };
}

export function useGooglePlacesAutocomplete(
  onPlaceSelected: (components: AddressComponents) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded } = useGoogleMapsScript();

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        fields: ["address_components", "formatted_address"],
      }
    );

    const listener = autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      const components = parseAddressComponents(place.address_components);
      onPlaceSelected(components);
    });

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [isLoaded, onPlaceSelected]);

  return inputRef;
}

function parseAddressComponents(
  components: google.maps.GeocoderAddressComponent[]
): AddressComponents {
  const result: AddressComponents = {
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  };

  let streetNumber = "";
  let route = "";

  components.forEach((component) => {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    }
    if (types.includes("route")) {
      route = component.long_name;
    }
    if (types.includes("locality")) {
      result.city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      result.state = component.short_name;
    }
    if (types.includes("postal_code")) {
      result.zipCode = component.long_name;
    }
    if (types.includes("country")) {
      result.country = component.short_name.toLowerCase();
    }
  });

  result.streetAddress = `${streetNumber} ${route}`.trim();

  return result;
}
