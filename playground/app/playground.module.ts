import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
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
  AddressFormComponent,
  GeocoderComponent
} from './components';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { PickerWithConfirmationComponent } from './components/picker-with-confirmation';
import { RouterModule } from '@angular/router';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsAddressModule.forRoot(),
    FsAddressRegionModule,
    FsAddressRegionCountryModule,
    AppMaterialModule,
    FsLabelModule,
    FsFormModule,
    RouterModule.forRoot([]),
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
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
    ConfigureComponent,
    PickerWithConfirmationComponent,
    GeocoderComponent,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
    { provide: GOOGLE_MAP_KEY, useValue: 'AIzaSyBigr-zo7xG6tqAiAvpqE2Bh4foHVrrSBE' }
  ]
})
export class PlaygroundModule {
}
