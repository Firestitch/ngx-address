import { Component } from '@angular/core';

import { FsAddressRegionConfig } from '@firestitch/address';
import { FormsModule } from '@angular/forms';
import { FsAddressRegionCountryComponent } from '../../../../src/app/components/address-region-country/address-region-country.component';
import { FsAclModule } from '@firestitch/acl';


@Component({
    selector: 'address-region-disabled-example',
    templateUrl: './address-region-disabled-example.component.html',
    standalone: true,
    imports: [
        FormsModule,
        FsAddressRegionCountryComponent,
        FsAclModule,
    ],
})
export class AddressRegionDisabledExampleComponent {

  public country = 'CA';
  public region = 'ON';
  public config: FsAddressRegionConfig = {
    // country: { disabled: true },
    // region: { disabled: true },
  };

}
