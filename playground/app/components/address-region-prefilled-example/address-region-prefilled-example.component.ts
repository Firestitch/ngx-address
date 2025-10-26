import { Component } from '@angular/core';

// Interfaces
import { FsAddressRegionConfig } from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressRegionCountryComponent } from '../../../../src/app/components/address-region-country/address-region-country.component';


@Component({
    selector: 'address-region-prefilled-example',
    templateUrl: 'address-region-prefilled-example.component.html',
    styles: [],
    standalone: true,
    imports: [FormsModule, FsAddressRegionCountryComponent]
})
export class AddressRegionPrefilledExampleComponent {

  public country = 'CA';
  public region = '';

  constructor() {

  }

}
