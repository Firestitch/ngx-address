import { Component } from '@angular/core';

// Interfaces
import { FsAddress, FsAddressConfig, FsAddressFormatConfig } from '@firestitch/address';
import { FsAddressComponent } from '../../../../src/app/components/address/address.component';
import { FsAddressFormatComponent } from '../../../../src/app/components/address-format/address-format.component';


@Component({
    selector: 'full-address-example',
    templateUrl: 'full-address-example.component.html',
    standalone: true,
    imports: [FsAddressComponent, FsAddressFormatComponent]
})
export class FullAddressExampleComponent {

  public address: FsAddress = {};

  public config: FsAddressConfig = {
    name: { required: false, visible: true },
    country: { required: true, visible: true },
    region: { required: true, visible: true },
    city: { required: true, visible: true },
    street: { required: true, visible: true },
    zip: { required: true, visible: true },
    map: {}
  };

  public addressFormatConfig: FsAddressFormatConfig = {
    city: false,
  };

  constructor() { }
}
