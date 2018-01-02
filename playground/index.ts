import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FsAddressModule }  from '@firestitch/address';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';

@Component({
  selector: 'app-root',
  templateUrl: 'template.html',
  styleUrls: [ 'styles.css' ],
  encapsulation: ViewEncapsulation.None
})
class AppComponent {
  address = {
    address1: '',
    lat: null,
    lng: null
  };

  private config = {
    countries: ['CA', 'US'],
    address2: { show: true },
    address: {required: true, name: 'address1'},
    city: {required: true},
    region: {required: true},
    zip: {required: true },
    country: {required: true}
  };

  constructor() { }

  save(form) {
    console.log(form);
  }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, FsAddressModule, BrowserAnimationsModule, FormsModule, FsFormModule ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
