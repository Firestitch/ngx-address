import { FsAddressMapConfig } from './address-map-config.interface';
import { FsAddressCollapseButtonConfig } from './address-collapse-button-config.interface';
import { AddressFormat } from '../enums/address-format.enum';

export interface FsAddressFieldSetting {
  disabled?: boolean,
  required?: boolean,
  visible?: boolean,
  placeholder?: string,
  list?: string[],
}

export interface FsAddressConfig {
  label?: string;
  hint?: string;
  name?: FsAddressFieldSetting,
  country?: FsAddressFieldSetting,
  region?: FsAddressFieldSetting,
  city?: FsAddressFieldSetting,
  street?: FsAddressFieldSetting,
  address2?: FsAddressFieldSetting,
  address3?: FsAddressFieldSetting,
  zip?: FsAddressFieldSetting,
  map?: FsAddressMapConfig,
  collapseButton?: FsAddressCollapseButtonConfig,
  lat?: FsAddressFieldSetting,
  lng?: FsAddressFieldSetting,
  search?: boolean;
  hideEnterManually?: boolean;
}

export interface FsAddressPickerConfig extends FsAddressConfig {
  format?: AddressFormat;
  readonly?: boolean;
  disabled?: boolean;
  confirmation?: boolean;
}

export interface AddressPickerConfig extends FsAddressPickerConfig {}
export interface IFsAddressConfig extends FsAddressConfig {}
export interface IFsAddressFieldSetting extends FsAddressFieldSetting {}
