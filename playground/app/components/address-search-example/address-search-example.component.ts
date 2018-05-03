import { Component, OnInit } from '@angular/core';

import { FsAddress } from '../../../../src/interfaces/address.interface';


@Component({
  selector: 'address-search-example',
  templateUrl: 'address-search-example.component.html',
  styles: []
})
export class AddressSearchExampleComponent implements OnInit {

  public address: FsAddress = {};

  constructor() {}

  public ngOnInit() {}

  public select(event) {
    console.log(event);
  }
}
