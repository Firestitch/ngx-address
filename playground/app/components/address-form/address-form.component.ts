import { Component } from '@angular/core';

// Interfaces
import { FsAddressConfig } from '@firestitch/address';


@Component({
  selector: 'address-form',
  templateUrl: 'address-form.component.html',
  styles: []
})
export class AddressFormComponent {

  public address = {
    address2: "",
    city: "Mississauga",
    country: "CA",
    createDate: "2022-08-04T10:34:50+00:00",
    guid: "fdfaf7e888bca174d85e81d42fd82116",
    id: 619,
    lat: 43.6777176,
    lng: -79.6248197,
    modifyDate: null,
    name: "Торонто",
    region: "ON",
    state: "active",
    street: "6301 Silver Dart Drive",
    timezone: "America/Toronto",
    zip: "L5P 1B2",
  };
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
