import { COUNTRIES as countries } from './constants/countries';
import { NgModule } from '@angular/core';

import { COUNTRIES } from './constants/inject-token-countries';

export const COUNTRY_CANADA = 'CA';
export const COUNTRY_UNITED_STATES = 'US';

@NgModule({
  providers: [
    { provide: COUNTRIES, useValue: countries }
  ]
})
export class FsAddressCountriesModule {}

