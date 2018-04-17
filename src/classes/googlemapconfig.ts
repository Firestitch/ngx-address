import { Injectable, Inject } from '@angular/core';
import { LazyMapsAPILoaderConfigLiteral } from '@agm/core';

export class GoogleMapConfig implements LazyMapsAPILoaderConfigLiteral {
  apiKey: string = null;
  constructor(@Inject('GoogleMapKey') apiKey) {
    if (!apiKey) {
      throw new Error('GoogleMapKey injector invalid');
    }

    this.apiKey = apiKey;
  }
};
