import { ChangeDetectionStrategy, Component } from '@angular/core';

// Interfaces
import { Country, FsAddressRegionConfig } from '@firestitch/address';


@Component({
  selector: 'address-region-required-example',
  templateUrl: './address-region-required-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
