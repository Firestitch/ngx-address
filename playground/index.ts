import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FsAddressModule }  from '@firestitch/address';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: 'template.html',
  styleUrls: [ 'styles.css' ],
  encapsulation: ViewEncapsulation.None
})
class AppComponent {
  public address: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private config = { address1: { required: true }};
  constructor() { }
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, FsAddressModule, BrowserAnimationsModule ],
  providers: [{ provide: 'GoogleMapKey', useValue: 'AIzaSyAoT2RLzCSFUb148F4uLXyAuquAzjcjyGk' }]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
