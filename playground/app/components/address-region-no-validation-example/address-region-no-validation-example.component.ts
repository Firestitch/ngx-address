import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FsAddressRegionCountryComponent } from '../../../../src/app/components/address-region-country/address-region-country.component';


@Component({
    selector: 'address-region-no-validation-example',
    templateUrl: 'address-region-no-validation-example.component.html',
    styles: [],
    standalone: true,
    imports: [FormsModule, FsAddressRegionCountryComponent]
})
export class AddressRegionNoValidationExampleComponent {

  public country = '';
  public region = '';

  public config = {
    country: {
      placeholder: 'Custom Country',
    },
  };

  constructor() {

  }

}
