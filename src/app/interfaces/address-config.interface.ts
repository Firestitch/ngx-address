import { IFsAddressMapConfig } from './address-map-config.interface';
import { IFsAddressCollapseButtonConfig } from './address-collapse-button-config.interface';
import { AddressFormat } from '../constants/enums';

export interface IFsAddressFieldSetting {
  disabled?: boolean,
  required?: boolean,
  visible?: boolean,
  list?: string[],
}

export interface IFsAddressConfig {
  label?: string;
  name?: IFsAddressFieldSetting,
  country?: IFsAddressFieldSetting,
  region?: IFsAddressFieldSetting,
  city?: IFsAddressFieldSetting,
  street?: IFsAddressFieldSetting,
  address2?: IFsAddressFieldSetting,
  zip?: IFsAddressFieldSetting,
  map?: IFsAddressMapConfig,
  collapseButton?: IFsAddressCollapseButtonConfig,
  lat?: IFsAddressFieldSetting,
  lng?: IFsAddressFieldSetting,
  search?: boolean
}

export interface AddressPickerConfig extends IFsAddressConfig {
  format?: AddressFormat,
  readonly?: boolean,
  disabled?: boolean
}
