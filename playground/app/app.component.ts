import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { AddressPickerComponent } from './components/address-picker/address-picker.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { AddressPickerPreFilledExampleComponent } from './components/address-picker-pre-filled-example/address-picker-pre-filled-example.component';
import { FormatExampleComponent } from './components/format-example/format-example.component';
import { AddressDisabledOrReadonlyExampleComponent } from './components/address-disabled-or-readonly-example/address-disabled-or-readonly-example.component';
import { AddressRegionNoValidationExampleComponent } from './components/address-region-no-validation-example/address-region-no-validation-example.component';
import { AddressRegionPrefilledExampleComponent } from './components/address-region-prefilled-example/address-region-prefilled-example.component';
import { AddressRegionComponent } from './components/address-region/address-region.component';
import { GeocoderComponent } from './components/geocoder/geocoder.component';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    standalone: true,
    imports: [FsExampleModule, AddressPickerComponent, AddressFormComponent, AddressPickerPreFilledExampleComponent, FormatExampleComponent, AddressDisabledOrReadonlyExampleComponent, AddressRegionNoValidationExampleComponent, AddressRegionPrefilledExampleComponent, AddressRegionComponent, GeocoderComponent]
})
export class AppComponent {
  public config = environment;
}
