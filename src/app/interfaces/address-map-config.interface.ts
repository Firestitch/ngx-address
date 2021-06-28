export interface FsAddressMapConfig {
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

export interface IFsAddressMapConfig extends FsAddressMapConfig {}
