import { IFsAddressMapConfig } from './address-map-config.interface';
import { IFsAddressCollapseButtonConfig } from './address-collapse-button-config.interface';
import { AddressFormat } from '../enums/address-format.enum';

export interface IFsAddressFieldSetting {
  disabled?: boolean,
  required?: boolean,
  visible?: boolean,
  placeholder?: string,
  list?: string[],
}

export interface IFsAddressConfig {
  label?: string;
  hint?: string;
  name?: IFsAddressFieldSetting,
  country?: IFsAddressFieldSetting,
  region?: IFsAddressFieldSetting,
  city?: IFsAddressFieldSetting,
  street?: IFsAddressFieldSetting,
  address2?: IFsAddressFieldSetting,
  address3?: IFsAddressFieldSetting,
  zip?: IFsAddressFieldSetting,
  map?: IFsAddressMapConfig,
  collapseButton?: IFsAddressCollapseButtonConfig,
  lat?: IFsAddressFieldSetting,
  lng?: IFsAddressFieldSetting,
  search?: boolean
}

export interface AddressPickerConfig extends IFsAddressConfig {
  format?: AddressFormat;
  readonly?: boolean;
  disabled?: boolean;
}
