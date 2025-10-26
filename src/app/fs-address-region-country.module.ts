import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FsAddressCountriesModule } from './fs-address-countries.module';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { FsFormModule } from '@firestitch/form';
import { FsAddressRegionCountryComponent } from './components/address-region-country/address-region-country.component';
import { FsAddressRegionModule } from './fs-address-region.module';
import { FsAddressCountryModule } from './fs-address-country.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FsFormModule,
        MatInputModule,
        MatSelectModule,
        FsAddressCountriesModule,
        FsAddressRegionModule,
        FsAddressCountryModule,
        FsAddressRegionCountryComponent
    ],
    exports: [
        FsAddressRegionCountryComponent
    ]
})
export class FsAddressRegionCountryModule {}
