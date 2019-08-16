import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsFieldEditorModule } from '@firestitch/field-editor';
import {  FsAddressModule,
          FsAddressRegionModule,
          FsAddressRegionCountryModule,
          GOOGLE_MAP_KEY } from '@firestitch/address';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

import {
  KitchenSinkComponent,
  ConfigureComponent,
  FullAddressExampleComponent,
  AddressDisabledOrReadonlyExampleComponent,
  AddressPickerRequiredNotBlankExampleComponent,
  AddressPickerRequiredAllExampleComponent,
  AddressPickerMapRequiredExampleComponent,
  FormatExampleComponent,
  AddressPickerPreFilledExampleComponent,
  AddressPickerNoValidationTwolineExampleComponent,
  AddressPickerCustomCollapseBtnComponent,
  AddressPickerNoValidationSummaryExampleComponent,
  AddressPickerCustomCollapseLabelComponent,
  AddressRegionPrefilledExampleComponent,
  AddressRegionRequiredExampleComponent,
  AddressRegionDisabledExampleComponent,
  AddressRegionNoValidationExampleComponent,
  AddressFormComponent
} from './components';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsAddressModule,
    FsAddressRegionModule,
    FsAddressRegionCountryModule,
    AppMaterialModule,
    FsLabelModule,
    FsFormModule,
    FsExampleModule.forRoot(),
    FsFieldEditorModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
  ],
  entryComponents: [
    ConfigureComponent
  ],
  declarations: [
    AppComponent,
    FullAddressExampleComponent,
    AddressDisabledOrReadonlyExampleComponent,
    KitchenSinkComponent,
    AddressPickerRequiredNotBlankExampleComponent,
    AddressPickerRequiredAllExampleComponent,
    AddressPickerMapRequiredExampleComponent,
    AddressPickerPreFilledExampleComponent,
    AddressPickerNoValidationTwolineExampleComponent,
    AddressPickerCustomCollapseBtnComponent,
    AddressPickerCustomCollapseLabelComponent,
    AddressPickerNoValidationSummaryExampleComponent,
    AddressRegionPrefilledExampleComponent,
    AddressRegionRequiredExampleComponent,
    AddressRegionDisabledExampleComponent,
    AddressRegionNoValidationExampleComponent,
    AddressFormComponent,
    FormatExampleComponent,
    ConfigureComponent
  ],
  providers: [
    { provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    { provide: GOOGLE_MAP_KEY, useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }
  ]
})
export class PlaygroundModule {
}
