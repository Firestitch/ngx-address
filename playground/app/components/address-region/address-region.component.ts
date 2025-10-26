import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Country } from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { FsAddressCountryComponent } from '../../../../src/app/components/address-country/address-country.component';
import { FsAddressRegionComponent } from '../../../../src/app/components/address-region/address-region.component';


@Component({
    selector: 'address-region',
    templateUrl: './address-region.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        FsAddressCountryComponent,
        FsAddressRegionComponent,
    ],
})
export class AddressRegionComponent {

  public countries = [Country.Canada];
  public region = 'ON';
  public country = Country.UnitedStates;

}
