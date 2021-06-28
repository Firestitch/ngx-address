/*
 * Public API Surface of fs-menu
 */

// Modules
export { FsAddressModule } from './app/fs-address.module';
export { FsAddressCountriesModule } from './app/fs-address-countries.module';
export { FsAddressRegionModule } from './app/fs-address-region.module';
export { FsAddressRegionCountryModule } from './app/fs-address-region-country.module';
export { FsAddressCountryModule } from './app/fs-address-country.module';

export { Countries } from './app/consts/countries.const';
export { Country } from './app/enums/country.enum';

// Inject Tokens
export { COUNTRIES } from './app/consts/inject-token-countries';
export { GOOGLE_MAP_KEY } from './app/consts/inject-token-google-map-key';

// Components
export { FsAddressComponent } from './app/components/address/address.component';
export { FsAddressFormatComponent } from './app/components/address-format/address-format.component';
export { FsAddressPickerComponent } from './app/components/address-picker/address-picker.component';
export { FsAddressSearchComponent } from './app/components/address-search/address-search.component';
export { FsAddressAutocompleteComponent } from './app/components/address-autocomplete/address-autocomplete.component';

// Interfaces

export { FsAddress } from './app/interfaces/address.interface';
export {
  FsAddressCollapseButtonConfig,
  IFsAddressCollapseButtonConfig,
} from './app/interfaces/address-collapse-button-config.interface';
export {
  FsAddressConfig,
  FsAddressPickerConfig,
  FsAddressFieldSetting,
  IFsAddressConfig,
  IFsAddressFieldSetting,
  AddressPickerConfig,
} from './app/interfaces/address-config.interface';
export {
  FsAddressFormatConfig,
  IFsAddressFormatConfig,
} from './app/interfaces/address-format-config.interface';
export {
  FsAddressMapConfig,
  IFsAddressMapConfig,
} from './app/interfaces/address-map-config.interface';
export {
  IFsAddressRegionConfig,
  FsAddressRegionConfig,
} from './app/interfaces/address-region-config.interface';
export { AddressFormat } from './app/enums/address-format.enum';

export {
  addressFormat,
  addressTwoLineFormat,
  addressOneLineFormat,
  addressSummaryFormat
} from './app/helpers';
