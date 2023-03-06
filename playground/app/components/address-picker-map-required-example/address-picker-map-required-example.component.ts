import {
  Component,
  OnInit,
} from '@angular/core';

// Interfaces
import {
  FsAddress,
  FsAddressConfig,
  FsAddressFormatConfig
} from '@firestitch/address';


@Component({
  selector: 'address-picker-map-required-example',
  templateUrl: './address-picker-map-required-example.component.html',
  styles: []
})
export class AddressPickerMapRequiredExampleComponent implements OnInit {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    country: { required: false, visible: true },
    region: { required: false, visible: true },
    city: { required: false, visible: true },
    street: { required: false, visible: true },
    zip: { required: false, visible: true },
    lat: { required: true },
    lng: { required: true },
    map: { zoom: 15 }
  };
  public addressFormatConfig: FsAddressFormatConfig = {
    name: false
  };

  constructor() {}

  public ngOnInit() {}

  public changeAddress(event) {
    console.log('Picker: All fields required', event);
    this.address = event;
  }

}
