import { useEffect, useState, useRef } from "react";

interface AddressComponents {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

let googleMapsPromise: Promise<void> | null = null;
let isGoogleMapsLoaded = false;

function loadGoogleMapsScript(apiKey: string): Promise<void> {
  if (isGoogleMapsLoaded || window.google?.maps?.places) {
    isGoogleMapsLoaded = true;
    return Promise.resolve();
  }

  if (googleMapsPromise) {
    return googleMapsPromise;
  }

  const existingScript = document.querySelector(
    `script[src^="https://maps.googleapis.com/maps/api/js"]`
  );
  if (existingScript) {
    isGoogleMapsLoaded = true;
    return Promise.resolve();
  }

  googleMapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      isGoogleMapsLoaded = true;
      resolve();
    };
    script.onerror = () => {
      googleMapsPromise = null;
      reject(new Error("Failed to load Google Maps"));
    };

    document.head.appendChild(script);
  });

  return googleMapsPromise;
}

export function useGoogleMapsScript() {
  const [isLoaded, setIsLoaded] = useState(isGoogleMapsLoaded);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY") {
      setError("Google Maps API key not configured");
      return;
    }

    if (isGoogleMapsLoaded) {
      setIsLoaded(true);
      return;
    }

    loadGoogleMapsScript(apiKey)
      .then(() => setIsLoaded(true))
      .catch((err) => setError(err.message));
  }, []);

  return { isLoaded, error };
}

export function useGooglePlacesAutocomplete(
  onPlaceSelected: (components: AddressComponents) => void
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const callbackRef = useRef(onPlaceSelected);
  const isInitializedRef = useRef(false);
  const { isLoaded } = useGoogleMapsScript();

  useEffect(() => {
    callbackRef.current = onPlaceSelected;
  }, [onPlaceSelected]);

  useEffect(() => {
    if (!isLoaded || !inputRef.current || isInitializedRef.current) return;
    if (autocompleteRef.current) return;

    isInitializedRef.current = true;

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["address"],
        fields: ["address_components", "formatted_address"],
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (!place?.address_components) return;

      const components = parseAddressComponents(place.address_components);
      callbackRef.current(components);
    });
  }, [isLoaded]);

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
