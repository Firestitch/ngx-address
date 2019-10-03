import {Component, OnInit, ViewChild} from '@angular/core';

import { FsAddressFormatComponent, FsAddressSearchComponent } from '@firestitch/address';

// Interfaces
import {
  FsAddress,
  IFsAddressConfig,
} from '@firestitch/address';


@Component({
  selector: 'address-disabled-or-readonly-example',
  templateUrl: 'address-disabled-or-readonly-example.component.html'
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

  public config: IFsAddressConfig = {};

  @ViewChild('format', { static: false }) format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}

}
