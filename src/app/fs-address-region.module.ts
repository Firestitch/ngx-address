import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import {
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { FsFormModule } from '@firestitch/form';
import { FsAddressRegionComponent } from './components/address-region/address-region.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatInputModule,
    MatSelectModule,
    FsAddressCountriesModule
  ],
  declarations: [
    FsAddressRegionComponent
  ],
  exports: [
    FsAddressRegionComponent
  ]
})
export class FsAddressRegionModule {}
