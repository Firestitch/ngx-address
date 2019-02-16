import { Inject, Optional } from '@angular/core';
import { LazyMapsAPILoaderConfigLiteral } from '@agm/core';
import { GOOGLE_MAP_KEY } from './../constants/inject-token-google-map-key';

export class GoogleMapConfig implements LazyMapsAPILoaderConfigLiteral {

  public apiKey: string = null;
  public libraries = [ 'places' ];

  constructor(@Inject(GOOGLE_MAP_KEY) apiKey, @Optional() @Inject('GoogleMapKey') legacyApiKey) {

    this.apiKey = apiKey ? apiKey : legacyApiKey;

    if (!this.apiKey) {
      throw new Error('Google Map Key injector invalid');
    }
  }
}
