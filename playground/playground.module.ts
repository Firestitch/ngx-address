import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsAddressModule } from '../src';

import { FullAddressExampleComponent } from './app/components/full-address-example/full-address-example.component';
import { FullAddressDisabledExampleComponent } from './app/components/full-address-disabled-example/full-address-disabled-example.component';
import { AddressPickerNoValidationExampleComponent } from './app/components/address-picker-no-validation-example/address-picker-no-validation-example.component';
import { AddressPickerRequiredNotBlankExampleComponent } from './app/components/address-picker-required-not-blank-example/address-picker-required-not-blank-example.component';
import { AddressPickerRequiredAllExampleComponent } from './app/components/address-picker-required-all-example/address-picker-required-all-example.component';
import { AddressPickerMapRequiredExampleComponent } from './app/components/address-picker-map-required-example/address-picker-map-required-example.component';
import { FormatExampleComponent } from './app/components/format-example/format-example.component';
import { AddressPickerPreFilledExampleComponent } from './app/components/address-picker-pre-filled-example/address-picker-pre-filled-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsAddressModule,
    AppMaterialModule,
    FsExampleModule
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FullAddressExampleComponent,
    FullAddressDisabledExampleComponent,
    AddressPickerNoValidationExampleComponent,
    AddressPickerRequiredNotBlankExampleComponent,
    AddressPickerRequiredAllExampleComponent,
    AddressPickerMapRequiredExampleComponent,
    AddressPickerPreFilledExampleComponent,
    FormatExampleComponent
  ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
export class PlaygroundModule {
}
