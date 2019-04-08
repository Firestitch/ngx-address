import { Component } from '@angular/core';

// Interfaces
import { IFsAddressRegionConfig } from '@firestitch/address';


@Component({
  selector: 'address-region-disabled-example',
  templateUrl: 'address-region-disabled-example.component.html',
  styles: []
})
export class AddressRegionDisabledExampleComponent {

  public country = 'CA';
  public region = 'ON';
  public config: IFsAddressRegionConfig = {
    country: { disabled: true },
    region: { disabled: true }
  };

  constructor() {

  }

}
