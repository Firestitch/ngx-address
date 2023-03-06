import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress, 
  FsAddressConfig,
  FsAddressFormatConfig
} from '@firestitch/address';

// Others
import { FsAddressPickerComponent } from '@firestitch/address';


@Component({
  selector: 'address-picker-required-all-example',
  templateUrl: './address-picker-required-all-example.component.html',  styles: []
})
export class AddressPickerRequiredAllExampleComponent implements OnInit {

  public address: FsAddress = {};
  public config: FsAddressConfig = {
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: true, visible: true },
    street: { required: true, visible: true },
    zip: { required: true, visible: true },
    lat: { required: true },
    lng: { required: true },
    map: { zoom: 15 }
  };
  public addressFormatConfig: FsAddressFormatConfig = {
    includeFirst: 3
  };

  @ViewChild('picker') picker: FsAddressPickerComponent;

  constructor() {}

  public ngOnInit() {}

  public changeAddress(event) {
    console.log('Picker: All fields required', event);
    this.address = event;
  }

  public addressChanged(event) {
    console.log('fired', event);
  }
}
