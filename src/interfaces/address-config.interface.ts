import { IFsAddressMapConfig } from './address-map-config.interface';
import { IFsAddressCollapseButtonConfig } from './address-collapse-button-config.interface';

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
  zip?: IFsAddressFieldSetting,
  map?: IFsAddressMapConfig,
  collapseButton?: IFsAddressCollapseButtonConfig,
  lat?: IFsAddressFieldSetting,
  lng?: IFsAddressFieldSetting
}
