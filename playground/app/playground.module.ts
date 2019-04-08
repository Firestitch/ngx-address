import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsAddressModule, GOOGLE_MAP_KEY } from '@firestitch/address';

import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './material.module';

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
  AddressPickerCustomCollapseLabelComponent,
  AddressRegionPrefilledExampleComponent,
  AddressRegionRequiredExampleComponent,
  AddressRegionDisabledExampleComponent,
  AddressRegionNoValidationExampleComponent,
} from './components';


@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FsAddressModule,
    AppMaterialModule,
    FsExampleModule.forRoot(),
    FsMessageModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
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
    AddressPickerCustomCollapseLabelComponent,
    AddressPickerNoValidationSummaryExampleComponent,
    AddressRegionPrefilledExampleComponent,
    AddressRegionRequiredExampleComponent,
    AddressRegionDisabledExampleComponent,
    AddressRegionNoValidationExampleComponent,
    FormatExampleComponent
  ],
  providers: [{ provide: GOOGLE_MAP_KEY, useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
export class PlaygroundModule {
}
