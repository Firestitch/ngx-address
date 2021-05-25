import { Component } from '@angular/core';

// Interfaces
import { IFsAddressConfig } from '@firestitch/address';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styles: []
})
export class AddressFormComponent {

  public address;
  public config: IFsAddressConfig = {
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
