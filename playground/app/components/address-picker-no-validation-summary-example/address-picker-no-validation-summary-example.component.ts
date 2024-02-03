import { ChangeDetectionStrategy, Component } from '@angular/core';

// Interfaces
import {
  AddressFormat,
  FsAddress,
  FsAddressConfig,
} from '@firestitch/address';

@Component({
  selector: 'address-picker-no-validation-summary-example',
  templateUrl: './address-picker-no-validation-summary-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressPickerNoValidationSummaryExampleComponent {

  public address: FsAddress = {};
  public AddressFormat = AddressFormat;
  public config: FsAddressConfig = {
    map: { zoom: 15 },
  };
}
