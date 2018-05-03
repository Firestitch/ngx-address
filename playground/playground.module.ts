import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';

import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsAddressModule } from '../src';

import { FullAddressExampleComponent } from './app/components/full-address-example/full-address-example.component';
import { AddressPickerExampleComponent } from './app/components/address-picker-example/address-picker-example.component';
import { AddressSearchExampleComponent } from './app/components/address-search-example/address-search-example.component';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    AgmCoreModule.forRoot({libraries: ['places']}),
    FsExampleModule,
    FsAddressModule,
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FullAddressExampleComponent,
    AddressPickerExampleComponent,
    AddressSearchExampleComponent
  ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
export class PlaygroundModule {
}
