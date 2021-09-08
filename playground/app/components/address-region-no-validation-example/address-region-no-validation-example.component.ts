import { Component } from '@angular/core';


@Component({
  selector: 'address-region-no-validation-example',
  templateUrl: 'address-region-no-validation-example.component.html',
  styles: []
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
