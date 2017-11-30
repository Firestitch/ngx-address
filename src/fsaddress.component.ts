import { FsGoogleMapsService } from './google-maps.service';
import { FormControl } from '@angular/forms';
import { FsAddressService, FsAddress } from './fsaddress.service';
import { Component, AfterViewInit, Output, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { } from '@types/googlemaps';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'fs-address',
  templateUrl: './fsaddress.component.html',
  styleUrls: ['./fsaddress.component.scss']
})
  export class FsAddressComponent implements OnInit, AfterViewInit {
  //interesting pattern of BehaviorSubject from RxJS. There are promises, which return value once. There are Observables, which return value multiple times and have interesting features. There is BehaviorSubject, which IS a value, but which you can subscribe for. I'm using this BehaviorSubject for two-way data binding between this and parent component - basically, with this one I emit all the collected data out of the component. Adds flexibility and beauty of structure :)
  @Input() location: BehaviorSubject<FsAddress> = new BehaviorSubject<FsAddress>({});
  @Input() key: string;
  private service: FsAddressService;
  addressCtrl: FormControl = new FormControl();;
  cityCtrl: FormControl = new FormControl();;
  zipCtrl: FormControl = new FormControl();;

  countryCtrl: FormControl;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  filteredCountries: Observable<any[]>;

  private googleMapsUrl;


  /*
    For now I've just mocked the countries and states. In my vision, it would be the best to use google maps library for autocompletion and many-many other functions, if we are to make more map-oriented components.
    If we do, I'll exctract google maps functionality and API calls into one functional module to be used in every component and work on it more closely.
    If we don't, I'll just import some JSONs downloaded from public websites for countries/states/areas autocompletion.
  */
  states: any[] = [
    {
      name: 'Arkansas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];
  countries: any[] = [
    {
      name: 'USA',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'Canada',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    }
  ];
  addresses: any[] = [];


  constructor(
    private fsGoogleMapsService: FsGoogleMapsService
  ) {
    
  }

  ngOnInit() {
    this.service = new FsAddressService();
    this.googleMapsUrl = 'https://maps.googleapis.com/maps/api/js?key=' + this.key;
    this.countryCtrl = new FormControl();
    this.stateCtrl = new FormControl();

    this.filteredCountries = this.countryCtrl.valueChanges
      .startWith(null)
      .map(country => country ? this.filterCountries(country) : this.countries.slice());
    this.filteredStates = this.stateCtrl.valueChanges
      .startWith(null)
      .map(state => state ? this.filterStates(state) : this.states.slice());

    this.addressCtrl.valueChanges.subscribe(address => {
      this.searchAddress(address);
    })
  }

  searchAddress(address: string) {
    let formattedAddress = "";
    this.service.getGeocode(address).subscribe(
      (res: google.maps.GeocoderResult) => {
        formattedAddress = res[0].formatted_address;

        this.location.next(this.service.parseAddress(res[0]));
        this.setUpFields(this.service.parseAddress(res[0]));
        this.service.setMarker(res[0].geometry.location);
      }, err => {

      })


    // this one is for autocompletion and many other awesome gmaps functions, commented by now as it has to be worked on more

    // this.fsGoogleMapsService.getAddresssPredictions(address).subscribe(res => {
    //   console.log('predictions res', res);
    // }, err => {
    //   console.log('predictions err', err);
    // })
  }

  // just a small beautiful feature to fill in all the fields whenever we have address put in. Whenever any element is "touched" (e.g. we've changed the ZIP code), it wont change anymore when putting in the address
  setUpFields(location: FsAddress) {
    if(location.country && !this.countryCtrl.touched) { //&& !this.countryCtrl.value) {
      this.countryCtrl.patchValue(location.country.long)
    }
    if(location.city && !this.cityCtrl.touched) { // && !this.cityCtrl.value) {
      this.cityCtrl.patchValue(location.city)
    }
    if(location.zip && !this.zipCtrl.touched) { // && !this.zipCtrl.value) {
      this.zipCtrl.patchValue(location.zip)
    }
    if(location.state && !this.stateCtrl.touched) { // && !this.stateCtrl.value) {
      this.stateCtrl.patchValue(location.state)
    } else this.stateCtrl.patchValue('')

  }

  ngAfterViewInit() {
    this.addMapsScript();
    // this.doMapInitLogic();
  }

  // we could have used some external google maps library, as it was used in fs-boilerplate 1.x, but I had really no need in it for this case, and I would like to avoid using 3rd-party libraries as much as I could while making this project. I love 3rd party libraries, but we ARE the 3rd party library people are going to use, so I'd like to keep it as native and simple as possible with as lesser layers as possible
  addMapsScript() {
    if (!document.querySelectorAll(`[src="${this.googleMapsUrl}"]`).length) {
      document.body.appendChild(Object.assign(
        document.createElement('script'), {
          type: 'text/javascript',
          src: this.googleMapsUrl,
          onload: () => this.doMapInitLogic()
        }));
    } else {
      this.doMapInitLogic();
    }
  }

  doMapInitLogic() {
    this.service.init(this.key);
  }


  autocompleteAddressess(addressList: string) {

  }

  filterStates(name: string) {
    return this.states.filter(state =>
      state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterCountries(name: string) {
    return this.countries.filter(country =>
      country.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

}
