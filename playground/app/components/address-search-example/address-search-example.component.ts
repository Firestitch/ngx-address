import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'address-search-example',
  templateUrl: 'address-search-example.component.html',
  styles: []
})
export class AddressSearchExampleComponent implements OnInit {

  public address: string; // =  "Hershey's Chocolate World, Park Boulevard, Hershey, PA, USA";

  constructor() {}

  public ngOnInit() {}

  public select(event) {
    console.log(event);
  }
}
