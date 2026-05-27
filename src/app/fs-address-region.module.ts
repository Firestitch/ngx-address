import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';

import { FsAutocompleteModule } from '@firestitch/autocomplete';
import { FsFormModule } from '@firestitch/form';

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
    FsAddressRegionComponent,
  ],
  exports: [
    FsAddressRegionComponent,
  ],
})
export class FsAddressRegionModule {}
