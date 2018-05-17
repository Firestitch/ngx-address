import { NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {} from '@types/googlemaps';
declare var google: any;

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

import { FsFormModule } from '@firestitch/form';
import { FsCommonModule } from '@firestitch/common';

import { GoogleMapConfig } from './classes/googlemapconfig';

import {
  FsAddressComponent,
  FsAddressFormatComponent,
  FsAddressPickerComponent,
  FsAddressSearchComponent
} from './components';


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
