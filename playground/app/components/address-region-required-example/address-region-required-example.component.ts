import { Component } from '@angular/core';

// Interfaces
import { FsAddressRegionConfig, Country } from '@firestitch/address';


@Component({
  selector: 'address-region-required-example',
  templateUrl: 'address-region-required-example.component.html',
  styles: []
})
export class AddressRegionRequiredExampleComponent {

  public country = '';
  public region = '';
  public config: FsAddressRegionConfig = {
    country: {
      required: true,
      list: [ Country.Canada, Country.UnitedStates ]
    },
    region: {
      required: true
    }
  };

  constructor() {

  }

}
