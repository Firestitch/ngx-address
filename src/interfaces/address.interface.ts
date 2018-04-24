export interface IFsLongShort {
  longName: string;
  shortName: string;
}

export interface FsAddress {
  name?: string,
  country?: IFsLongShort
  state?: IFsLongShort,
  region?: IFsLongShort,
  address?: string,
  city?: string,
  zip?: string,
  lat?: number,
  lng?: number
}
