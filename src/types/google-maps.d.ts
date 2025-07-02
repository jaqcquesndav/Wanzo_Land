// Type definition for Google Maps API
declare global {
  interface Window {
    google: {
      maps: {
        Map: any;
        Marker: any;
        LatLng: any;
        MapTypeControlStyle: any;
        [key: string]: any;
      };
    };
  }
}

export {};
