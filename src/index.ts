import { MatInputModule, MatAutocompleteModule, MatSelectModule, MatButtonModule } from '@angular/material';

import { FsAddressComponent } from './fsaddress.component';
import { JsonpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders, Injectable, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsFormModule } from '@firestitch/form';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule, GoogleMapsAPIWrapper, MarkerManager, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral } from '@agm/core';

export * from './fsaddress.component';

@Injectable()
export class FsAddressConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = null;
  constructor(@Inject('GoogleMapKey') GoogleMapKey) {
    this.apiKey = GoogleMapKey;

    if (!GoogleMapKey) {
      throw new Error('GoogleMapKey injector invalid');
    }
  }
};

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
    AgmCoreModule.forRoot()
],
declarations: [
    FsAddressComponent
],
providers: [
    GoogleMapsAPIWrapper,
    MarkerManager,
    { provide: LAZY_MAPS_API_CONFIG, useClass: FsAddressConfig }
],
exports: [
    FsAddressComponent
]
})
export class FsAddressModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsAddressModule,
      providers: []
    };
  }
}
