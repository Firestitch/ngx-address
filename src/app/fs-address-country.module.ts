import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteModule } from '@firestitch/autocomplete';
import { FsAddressCountryComponent } from './components/address-country/address-country.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    FsAddressCountriesModule,
    FsAutocompleteModule,
  ],
  declarations: [
    FsAddressCountryComponent
  ],
  exports: [
    FsAddressCountryComponent
  ]
})
export class FsAddressCountryModule {}
