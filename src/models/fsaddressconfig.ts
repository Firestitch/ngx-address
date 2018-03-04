import { Injectable, Inject } from '@angular/core';
import { LazyMapsAPILoaderConfigLiteral } from '@agm/core';

export class FsAddressConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = null;
  constructor(@Inject('GoogleMapKey') GoogleMapKey) {
    this.apiKey = GoogleMapKey;

    if (!GoogleMapKey) {
      throw new Error('GoogleMapKey injector invalid');
    }
  }
};
