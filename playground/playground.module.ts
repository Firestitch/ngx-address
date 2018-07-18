import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsAddressModule } from '../src';

import {
  FullAddressExampleComponent,
  AddressDisabledOrReadonlyExampleComponent,
  AddressPickerNoValidationExampleComponent,
  AddressPickerRequiredNotBlankExampleComponent,
  AddressPickerRequiredAllExampleComponent,
  AddressPickerMapRequiredExampleComponent,
  FormatExampleComponent,
  AddressPickerPreFilledExampleComponent,
  AddressPickerNoValidationTwolineExampleComponent,
  AddressPickerCustomCollapseBtnComponent,
  AddressPickerNoValidationSummaryExampleComponent,
} from './app/components';

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
    AddressDisabledOrReadonlyExampleComponent,
    AddressPickerNoValidationExampleComponent,
    AddressPickerRequiredNotBlankExampleComponent,
    AddressPickerRequiredAllExampleComponent,
    AddressPickerMapRequiredExampleComponent,
    AddressPickerPreFilledExampleComponent,
    AddressPickerNoValidationExampleComponent,
    AddressPickerNoValidationTwolineExampleComponent,
    AddressPickerCustomCollapseBtnComponent,
    AddressPickerNoValidationSummaryExampleComponent,
    FormatExampleComponent
  ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
export class PlaygroundModule {
}
