import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import {
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { FsFormModule } from '@firestitch/form';
import { FsAddressRegionCountryComponent } from './components/address-region-country/address-region-country.component';
import { FsAddressRegionModule } from './fs-address-region.module';
import { FsAddressCountryModule } from './fs-address-country.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatInputModule,
    MatSelectModule,
    FsAddressCountriesModule,
    FsAddressRegionModule,
    FsAddressCountryModule
  ],
  declarations: [
    FsAddressRegionCountryComponent
  ],
  exports: [
    FsAddressRegionCountryComponent
  ]
})
export class FsAddressRegionCountryModule {}
