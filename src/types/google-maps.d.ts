interface Window {
  google?: typeof google;
}

declare namespace google {
  namespace maps {
    class Map {}

    namespace places {
      class Autocomplete {
        constructor(input: HTMLInputElement, options?: AutocompleteOptions);
        addListener(eventName: string, handler: () => void): MapsEventListener;
        getPlace(): PlaceResult;
      }

      interface AutocompleteOptions {
        types?: string[];
        fields?: string[];
        componentRestrictions?: { country: string | string[] };
      }

      interface PlaceResult {
        address_components?: GeocoderAddressComponent[];
        formatted_address?: string;
      }
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    namespace event {
      function removeListener(listener: MapsEventListener): void;
    }

    interface MapsEventListener {
      remove(): void;
    }
  }
}
