import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteModule } from '@firestitch/autocomplete';

import { FsAddressRegionComponent } from './components/address-region/address-region.component';
import { FsAddressCountriesModule } from './fs-address-countries.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatInputModule,
    MatSelectModule,
    FsAddressCountriesModule,
    FsAutocompleteModule,
  ],
  declarations: [
    FsAddressRegionComponent
  ],
  exports: [
    FsAddressRegionComponent
  ]
})
export class FsAddressRegionModule {}
