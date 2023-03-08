import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import { FsMapModule } from '@firestitch/map';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { FsFormModule } from '@firestitch/form';
import { FsDialogModule } from '@firestitch/dialog';

import { FsAddressComponent } from './components/address/address.component';
import { FsAddressFormatComponent } from './components/address-format/address-format.component';
import { FsAddressPickerComponent } from './components/address-picker/address-picker.component';
import { FsAddressSearchComponent } from './components/address-search/address-search.component';
import { FsAddressRegionModule } from './fs-address-region.module';
import { FsAddressCountryModule } from './fs-address-country.module';
import { FsAddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { FsAddressAutocompleteComponent } from './components/address-autocomplete/address-autocomplete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FsFormModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    FlexLayoutModule,
    FsAddressCountriesModule,
    FsDialogModule,
    FsAddressRegionModule,
    FsAddressCountryModule,
    FsMapModule,
  ],
  exports: [
    FsAddressComponent,
    FsAddressFormatComponent,
    FsAddressPickerComponent,
    FsAddressSearchComponent,
    FsAddressAutocompleteComponent,
  ],
  declarations: [
    FsAddressComponent,
    FsAddressFormatComponent,
    FsAddressPickerComponent,
    FsAddressSearchComponent,
    FsAddressDialogComponent,
    FsAddressAutocompleteComponent,
  ]
})
export class FsAddressModule {
  static forRoot(): ModuleWithProviders<FsAddressModule> {
    return {
      ngModule: FsAddressModule,
    };
  }
}
