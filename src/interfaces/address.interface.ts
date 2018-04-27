export interface IFsLongShort {
  longName: string;
  shortName: string;
}

export interface FsAddress {
  name?: string,
  description?: string,
  country?: IFsLongShort
  region?: IFsLongShort,
  city?: string,
  street?: string,
  zip?: string,
  lat?: number,
  lng?: number
}
