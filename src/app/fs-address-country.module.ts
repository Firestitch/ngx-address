import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import { MatSelectModule } from '@angular/material/select';

import { FsFormModule } from '@firestitch/form';
import { FsAddressCountryComponent } from './components/address-country/address-country.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatSelectModule,
    FsAddressCountriesModule
  ],
  declarations: [
    FsAddressCountryComponent
  ],
  exports: [
    FsAddressCountryComponent
  ]
})
export class FsAddressCountryModule {}
