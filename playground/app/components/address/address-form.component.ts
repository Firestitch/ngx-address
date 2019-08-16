import { Component } from '@angular/core';

// Interfaces
import { IFsAddressRegionConfig, IFsAddressConfig } from './node_modules/@firestitch/address';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styles: []
})
export class AddressFormComponent {

  public address;
  public config: IFsAddressConfig = {
    search: false,
    map: false
  };

  change(address) {
    this.address = address;
  }

}
