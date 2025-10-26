import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';

import { FsAddressGeocoder } from 'src/app/services/address-geocoder';
import { MatButton } from '@angular/material/button';
import { FsFormModule } from '@firestitch/form';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'app-geocoder',
    templateUrl: 'geocoder.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatButton,
        FsFormModule,
        JsonPipe,
    ],
})
export class GeocoderComponent {

  public results;

  constructor(
    private _addressService: FsAddressGeocoder,
    private _cdRef: ChangeDetectorRef,
  ) {
  }

  public lookup() {
    this._addressService.lookup('20 Cooper Square, New York, NY 10003, USA')
    .subscribe((results) => {
      this.results = results;
      this._cdRef.markForCheck();
    });
  }
}
