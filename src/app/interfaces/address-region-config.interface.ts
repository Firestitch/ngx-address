import { FsAddressFieldSetting } from './address-config.interface';

export interface FsAddressRegionConfig {
  country?: FsAddressFieldSetting,
  region?: FsAddressFieldSetting,
}

export interface IFsAddressRegionConfig extends FsAddressRegionConfig {}

