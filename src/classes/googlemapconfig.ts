import { Injectable, Inject } from '@angular/core';
import { LazyMapsAPILoaderConfigLiteral } from '@agm/core';

export class GoogleMapConfig implements LazyMapsAPILoaderConfigLiteral {

  public apiKey: string = null;
  public libraries: string[] = ['places'];

  constructor(@Inject('GoogleMapKey') apiKey) {
    if (!apiKey) {
      throw new Error('GoogleMapKey injector invalid');
    }

    this.apiKey = apiKey;
  }
};
