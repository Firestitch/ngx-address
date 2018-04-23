export interface IFsAddressFieldSetting {
  required?: boolean,
  isVisible?: boolean,
  showOnly?: string[],
}

export interface IFsAddressConfig {
  country?: IFsAddressFieldSetting,
  state?: IFsAddressFieldSetting,
  region?: IFsAddressFieldSetting,
  city?: IFsAddressFieldSetting,
  address?: IFsAddressFieldSetting,
  zip?: IFsAddressFieldSetting,
}
