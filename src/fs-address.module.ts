import { NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsCommonModule } from '@firestitch/common';
import { FsAddressComponent } from './components/fs-address/fs-address.component';
import { FsAddressFormatComponent } from './components/fs-address-format/fs-address-format.component';
import { JsonpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  AgmCoreModule,
  GoogleMapsAPIWrapper,
  MarkerManager,
  LAZY_MAPS_API_CONFIG } from '@agm/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { GoogleMapConfig } from './classes/googlemapconfig';

import { FsAddressPickerComponent } from './components/fs-address-picker/fs-address-picker.component';
import { FsAddressSearchComponent } from './components/fs-address-search/fs-address-search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    JsonpModule,
    FsFormModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot(),

    ReactiveFormsModule,
  ],
  exports: [
    AgmCoreModule,
    FsAddressComponent,
    FsAddressFormatComponent,

    FsAddressPickerComponent,
    FsAddressSearchComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FsAddressComponent,
    FsAddressFormatComponent,

    FsAddressPickerComponent,
    FsAddressSearchComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    MarkerManager,
    { provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapConfig }
  ],
})
export class FsAddressModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAddressModule
    };
  }
}
