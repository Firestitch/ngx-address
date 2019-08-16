import { Component } from '@angular/core';

// Interfaces
import { IFsAddressRegionConfig, IFsAddressConfig } from '@firestitch/address';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styles: []
})
export class AddressFormComponent {

  public address;
  public config: IFsAddressConfig = {};

  change(address) {
    this.address = address;
  }

}
