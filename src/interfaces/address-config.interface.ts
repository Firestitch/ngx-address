import { IFsAddressMapConfig } from './address-map-config.interface';

export interface IFsAddressFieldSetting {
  disabled?: boolean,
  required?: boolean,
  visible?: boolean,
  list?: string[],
}

export interface IFsAddressConfig {
  name?: IFsAddressFieldSetting,
  country?: IFsAddressFieldSetting,
  region?: IFsAddressFieldSetting,
  city?: IFsAddressFieldSetting,
  street?: IFsAddressFieldSetting,
  zip?: IFsAddressFieldSetting,
  map?: IFsAddressMapConfig
}
