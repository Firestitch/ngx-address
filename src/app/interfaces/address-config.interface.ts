import { AddressFormat } from '../enums/address-format.enum';

import { FsAddressCollapseButtonConfig } from './address-collapse-button-config.interface';
import { FsAddressMapConfig } from './address-map-config.interface';

export interface FsAddressFieldSetting {
  disabled?: boolean,
  required?: boolean,
  visible?: boolean,
  placeholder?: string,
  list?: string[],
}

export interface FsAddressGoogleConfig {
  /**
   * Extra options merged into every
   * google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions()
   * call that powers the address search. Use this to constrain or bias the
   * Places search — e.g. `includedPrimaryTypes`, `includedRegionCodes`,
   * `locationBias`, `locationRestriction`, `region`, `language`, `origin`.
   *
   * `input` is always supplied by the component and cannot be overridden.
   *
   * @example { includedPrimaryTypes: ['pharmacy'] }
   */
  autocomplete?: Omit<google.maps.places.AutocompleteRequest, 'input'>;
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
  googleConfig?: FsAddressGoogleConfig;
}

export interface FsAddressPickerConfig extends FsAddressConfig {
  format?: AddressFormat;
  readonly?: boolean;
  disabled?: boolean;
  confirmation?: boolean;
  placeholder?: string;
}

export interface AddressPickerConfig extends FsAddressPickerConfig {}
export interface IFsAddressConfig extends FsAddressConfig {}
export interface IFsAddressFieldSetting extends FsAddressFieldSetting {}
