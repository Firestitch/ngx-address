import { Component, OnInit } from '@angular/core';
import { IFsAddressConfig } from '../../../../src/interfaces/address-config.interface';

@Component({
  selector: 'address-picker-example',
  templateUrl: 'address-picker-example.component.html',
  styles: []
})
export class AddressPickerExampleComponent implements OnInit {

  public address: string; // = "Hershey Lodge, University Drive, Hershey, PA, USA";

  // public address = {
  //   description: "Hershey's Chocolate World, Park Boulevard, Hershey, PA, USA",
  //   id: "3d8bf452dbe8cbd511f12ae85415dc65042fa453",
  //   place_id: "ChIJu14T-j67yIkR2eHQjYSogyM"
  // };

  public config: IFsAddressConfig = {
    country: { required: true, isVisible: true, showOnly: ['CA', 'US'] },
    state: { required: true, isVisible: true },
    region: { required: true, isVisible: true },
    city: { required: true, isVisible: true },
    address: { required: true, isVisible: true },
    zip: { required: true, isVisible: true },
  };

  constructor() {}

  public ngOnInit() {}

  public select(event) {
    console.log(event);
  }

}
