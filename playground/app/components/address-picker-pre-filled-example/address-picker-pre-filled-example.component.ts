import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

// Interfaces
import {
  FsAddress, FsAddressSearchComponent,
  IFsAddressConfig,
} from '@firestitch/address';

import { FsAddressFormatComponent } from '@firestitch/address';

@Component({
  selector: 'address-picker-pre-filled-example',
  templateUrl: 'address-picker-pre-filled-example.component.html',
  styles: []
})
export class AddressPickerPreFilledExampleComponent implements OnInit {

  public address: FsAddress = {
    name: 'CN Tower',
    country: 'CA',
    region: 'ON',
    city: 'Toronto',
    street: '301 Front Street West',
    zip: 'M5V 2T6'
  };

  public config: IFsAddressConfig = { };

  @ViewChild('format', { static: false }) format: FsAddressFormatComponent;

  constructor() {}

  public ngOnInit() {}
}
