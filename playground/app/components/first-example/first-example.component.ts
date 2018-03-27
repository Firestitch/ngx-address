import { Component } from '@angular/core';

@Component({
  selector: 'first-example',
  templateUrl: 'first-example.component.html'
})
export class FirstExampleComponent {
  address = {
    address1: '',
    lat: null,
    lng: null
  };

  parts = [];

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

  change(address) {
    console.log('Changed', address);
  }

  changeFormat(parts) {
    setTimeout(() => {
      this.parts = parts;
    });
  }

  save(form) {
    console.log(form);
  }
}
