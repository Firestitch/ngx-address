import { Countries } from './consts/countries.const';
import { NgModule } from '@angular/core';

import { COUNTRIES } from './consts/inject-token-countries';

@NgModule({
  providers: [
    { provide: COUNTRIES, useValue: Countries }
  ]
})
export class FsAddressCountriesModule {}

