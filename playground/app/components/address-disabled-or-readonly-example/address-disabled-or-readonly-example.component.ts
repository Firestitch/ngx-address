import {Component, OnInit, ViewChild} from '@angular/core';

import { AddressFormat, FsAddressFormatComponent } from '@firestitch/address';

// Interfaces
import {
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';


@Component({
  selector: 'address-disabled-or-readonly-example',
  templateUrl: './address-disabled-or-readonly-example.component.html'
})
export class AddressDisabledOrReadonlyExampleComponent implements OnInit {

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6'
  };

  public config: FsAddressConfig = {};
  public AddressFormat = AddressFormat;

  @ViewChild('format') format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}

}
