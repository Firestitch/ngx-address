import { Component } from '@angular/core';

// Interfaces
import { FsAddressConfig } from '@firestitch/address';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styles: []
})
export class AddressFormComponent {

  public address;
  public config: FsAddressConfig = {
    address2: {
      visible: true,
    },
    address3: {
      visible: true,
    }
   };

  change(address) {
    this.address = address;
  }

}
