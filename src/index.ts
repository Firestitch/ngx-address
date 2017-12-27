import { MatInputModule, MatAutocompleteModule } from '@angular/material';

import { FsAddressComponent } from './fsaddress.component';
import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsAddressService } from './fsaddress.service';
//import { FsGoogleMapsService } from './google-maps.service';
import { } from 'googlemaps';

export * from './fsaddress.service';
export * from './fsaddress.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule,
    MatInputModule,
    MatAutocompleteModule
],
declarations: [
    FsAddressComponent
],
providers: [
    FsAddressService
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
