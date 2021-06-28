import { Component } from '@angular/core';

// Interfaces
import { FsAddressRegionConfig } from '@firestitch/address';


@Component({
  selector: 'address-region-prefilled-example',
  templateUrl: 'address-region-prefilled-example.component.html',
  styles: []
})
export class AddressRegionPrefilledExampleComponent {

  public country = 'CA';
  public region = '';

  constructor() {

  }

}
