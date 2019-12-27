import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
