import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FsClearModule } from '@firestitch/clear';
import { FsDialogModule } from '@firestitch/dialog';
import { FsFormModule } from '@firestitch/form';
import { FsMapModule } from '@firestitch/map';

import { FsAddressAutocompleteComponent } from './components/address-autocomplete/address-autocomplete.component';
import { FsAddressDialogComponent } from './components/address-dialog/address-dialog.component';
import { FsAddressFormatComponent } from './components/address-format/address-format.component';
import { FsAddressPickerComponent } from './components/address-picker/address-picker.component';
import { FsAddressSearchComponent } from './components/address-search/address-search.component';
import { FsAddressComponent } from './components/address/address.component';
import { FsAddressCountriesModule } from './fs-address-countries.module';
import { FsAddressCountryModule } from './fs-address-country.module';
import { FsAddressRegionModule } from './fs-address-region.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,

    FsFormModule,
    FsAddressCountriesModule,
    FsDialogModule,
    FsAddressRegionModule,
    FsAddressCountryModule,
    FsMapModule,
    FsClearModule,
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
  ],
})
export class FsAddressModule {
  public static forRoot(): ModuleWithProviders<FsAddressModule> {
    return {
      ngModule: FsAddressModule,
    };
  }
}
