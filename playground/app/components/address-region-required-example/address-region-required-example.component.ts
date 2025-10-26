import { ChangeDetectionStrategy, Component } from '@angular/core';

// Interfaces
import { Country, FsAddressRegionConfig } from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressRegionCountryComponent } from '../../../../src/app/components/address-region-country/address-region-country.component';


@Component({
    selector: 'address-region-required-example',
    templateUrl: './address-region-required-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FormsModule, FsAddressRegionCountryComponent],
})
export class AddressRegionRequiredExampleComponent {

  public country = '';
  public region = '';
  public config: FsAddressRegionConfig = {
    country: {
      required: true,
      list: [Country.Canada, Country.UnitedStates],
    },
    region: {
      required: true,
    },
  };

  constructor() {

  }

}
