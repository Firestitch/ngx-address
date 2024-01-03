import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

import {
  FsAddressModule,
  FsAddressRegionCountryModule,
  FsAddressRegionModule,
} from '@firestitch/address';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMapModule } from '@firestitch/map';
import { FsMessageModule } from '@firestitch/message';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import {
  AddressDisabledOrReadonlyExampleComponent,
  AddressFormComponent,
  AddressPickerComponent,
  AddressPickerCustomCollapseBtnComponent,
  AddressPickerCustomCollapseLabelComponent,
  AddressPickerMapRequiredExampleComponent,
  AddressPickerNoValidationSummaryExampleComponent,
  AddressPickerNoValidationTwolineExampleComponent,
  AddressPickerPreFilledExampleComponent,
  AddressPickerRequiredAllExampleComponent,
  AddressPickerRequiredNotBlankExampleComponent,
  AddressRegionComponent,
  AddressRegionDisabledExampleComponent,
  AddressRegionNoValidationExampleComponent,
  AddressRegionPrefilledExampleComponent,
  AddressRegionRequiredExampleComponent,
  FormatExampleComponent,
  FullAddressExampleComponent,
  GeocoderComponent,
} from './components';
import { PickerWithConfirmationComponent } from './components/picker-with-confirmation';
import { AppMaterialModule } from './material.module';


@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsAddressModule,
    FsMapModule.forRoot({
      googleMapKey: 'AIzaSyBigr-zo7xG6tqAiAvpqE2Bh4foHVrrSBE',
    }),
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
    AddressPickerComponent,
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
    AddressRegionComponent,
    PickerWithConfirmationComponent,
    GeocoderComponent,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { float: 'auto' } },
  ],
})
export class PlaygroundModule {
}
