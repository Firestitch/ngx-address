import { NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsCommonModule } from '@firestitch/common';
import { FsAddressComponent } from './components/fs-address/fs-address.component';
import { FsAddressFormatComponent } from './components/fs-address-format/fs-address-format.component';
import { JsonpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule, GoogleMapsAPIWrapper,
         MarkerManager, LAZY_MAPS_API_CONFIG } from '@agm/core';
import {
          MatAutocompleteModule,
          MatButtonModule,
          MatInputModule,
          MatSelectModule
        } from '@angular/material';
import { GoogleMapConfig } from './classes/googlemapconfig';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    JsonpModule,
    FsFormModule,
    FlexLayoutModule,
    MatButtonModule,
    FsCommonModule,
    AgmCoreModule.forRoot()
  ],
  exports: [
    FsAddressComponent,
    FsAddressFormatComponent
  ],
  entryComponents: [
  ],
  declarations: [
    FsAddressComponent,
    FsAddressFormatComponent
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
