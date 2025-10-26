import { Component } from '@angular/core';

// Interfaces
import { AddressFormat, FsAddress } from '@firestitch/address';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'format-example',
    templateUrl: 'format-example.component.html',
    standalone: true,
    imports: [FsAddressFormatComponent]
})
export class FormatExampleComponent {

  public AddressFormat = AddressFormat;

  public address: FsAddress = {
    name: 'CN Tower',
    street: '301 Front St W',
    city: 'Toronto',
    region: 'ON',
    zip: 'M5V 2T6'
  };


  constructor() { }
}
