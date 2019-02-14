export interface IFsAddressMapConfig {
  showMap?: boolean,
  center?: {
    latitude?: number,
    longitude?: number,
  },
  zoom?: number,
  scrollwheel?: boolean,
  streetViewControl?: boolean,
  zoomControl?: boolean,
  mapTypeControlOptions?: { mapTypeIds?: any[] },
  marker?: any
}
