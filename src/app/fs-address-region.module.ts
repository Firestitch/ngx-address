import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

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
