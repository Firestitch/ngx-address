import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

import { FsAclModule } from '@firestitch/acl';
import {
  FsAddressModule,
  FsAddressRegionCountryModule,
  FsAddressRegionModule,
} from '@firestitch/address';
import { FsExampleModule } from '@firestitch/example';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FS_MAP_GOOGLE_MAP_KEY } from '@firestitch/map';
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
    FsAddressRegionModule,
    FsAddressRegionCountryModule,
    AppMaterialModule,
    FsLabelModule,
    FsAclModule,
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
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: { float: 'auto' },
    },
    {
      provide: FS_MAP_GOOGLE_MAP_KEY,
      useValue: 'AIzaSyBigr-zo7xG6tqAiAvpqE2Bh4foHVrrSBE',
    },
  ],
})
export class PlaygroundModule {
}
