import { Component } from '@angular/core';

// Interfaces
import { AddressFormat, FsAddress } from '@firestitch/address';


@Component({
  selector: 'format-example',
  templateUrl: 'format-example.component.html'
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
