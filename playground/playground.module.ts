import './../tools/assets/playground.scss';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app/app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app/material.module';
import { FsExampleModule } from '@firestitch/example';
import { FsExamplesComponent } from '../tools/components/examples/examples.component';
import { FirstExampleComponent } from './app/components/first-example/first-example.component';
import { FsAddressModule } from '../src';

import { AddressPickerExampleComponent } from './app/components/address-picker-example/address-picker-example.component';
import { AddressSearchExampleComponent } from './app/components/address-search-example/address-search-example.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule,
    FsAddressModule,

    AgmCoreModule.forRoot({libraries: ['places']}),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    FsExamplesComponent,

    FirstExampleComponent,

    AddressPickerExampleComponent,
    AddressSearchExampleComponent
  ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
export class PlaygroundModule {
}
