import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { FsAutocompleteChipsModule } from '@firestitch/autocomplete-chips';
import { FsFormModule } from '@firestitch/form';

import { FsAddressCountryComponent } from './components/address-country/address-country.component';
import { FsAddressCountriesModule } from './fs-address-countries.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    FsAddressCountriesModule,
    FsAutocompleteChipsModule,
  ],
  declarations: [
    FsAddressCountryComponent,
  ],
  exports: [
    FsAddressCountryComponent,
  ],
})
export class FsAddressCountryModule {}
