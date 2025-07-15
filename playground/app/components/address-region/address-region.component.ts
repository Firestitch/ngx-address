import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Country } from '@firestitch/address';


@Component({
  selector: 'address-region',
  templateUrl: './address-region.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressRegionComponent {

  public countries = [Country.Canada];
  public region = 'ON';
  public country = Country.UnitedStates;

}
