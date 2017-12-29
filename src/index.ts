import { MatInputModule, MatAutocompleteModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { FsAddressComponent } from './fsaddress.component';
import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsAddressService } from './fsaddress.service';
import { FsFormModule } from '@firestitch/form';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
// import { FsGoogleMapsService } from './google-maps.service';
// import { } from 'googlemaps';

export * from './fsaddress.service';
export * from './fsaddress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    MatInputModule,
    MatAutocompleteModule,
    FsFormModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule,
    // @TODO replace from here
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk'
    })
],
declarations: [
    FsAddressComponent
],
providers: [
    FsAddressService,
    GoogleMapsAPIWrapper,
    MarkerManager
],
exports: [
    FsAddressComponent
]
})
export class FsAddressModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAddressModule,
      providers: [FsAddressService]
    };
  }
}
