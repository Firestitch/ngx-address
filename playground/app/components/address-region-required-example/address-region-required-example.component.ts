import { Component } from '@angular/core';

// Interfaces
import { IFsAddressRegionConfig } from '@firestitch/address';


@Component({
  selector: 'address-region-required-example',
  templateUrl: 'address-region-required-example.component.html',
  styles: []
})
export class AddressRegionRequiredExampleComponent {

  public country = '';
  public region = '';
  public config: IFsAddressRegionConfig = {
    country: {
      required: true
    },
    region: {
      required: true
    }
  };

  constructor() {

  }

}
