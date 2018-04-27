import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs/Subject';

import { FsAddress } from '../../interfaces/address.interface';


@Component({
  selector: 'fs-address-search',
  templateUrl: './fs-address-search.component.html',
  styleUrls: ['./fs-address-search.component.scss'],
})
export class FsAddressSearchComponent implements OnInit, OnDestroy {

  @Input() address: FsAddress = {};
  @Output() selected: EventEmitter<any> = new EventEmitter<any>();

  // Address Predictions
  public predictions: google.maps.places.AutocompletePrediction[] = [];

  @ViewChild('search')
  public searchElement: ElementRef;

  // Google
  public googleAutocompleteService: google.maps.places.AutocompleteService;
  public googlePlacesService: google.maps.places.PlacesService;

  // Other
  private _changeAddressDebounce = new Subject<any>();

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) {
    this._changeAddressDebounce
      .debounceTime(300)
      .subscribe(value => {
        this.updatePredictions(value);
      });
  }

  public ngOnInit() {
    this.initAddress();
    this.initGoogleMap();

    if (this.address && this.address.description) {
      this.updatePredictions(this.address.description);
    }
  }

  public ngOnDestroy() {}

  private initAddress() {
    this.address = Object.assign({
      name: null,
      country: null,
      region: null,
      address: null,
      city: null,
      zip: null,
      lat: null,
      lng: null
    }, this.address);
  }

  private initGoogleMap() {
    this._mapsAPILoader
      .load()
      .then(() => {
        this.googleAutocompleteService = new google.maps.places.AutocompleteService();
        this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);
      });
  }

  private updatePredictions(value) {
    if (value && this.googleAutocompleteService) {

      this.googleAutocompleteService.getPlacePredictions(
        {input: value},
        (predictions, status) => {
          this._ngZone.run(() => {
            this.predictions.length = 0;

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return;
            }

            this.predictions = predictions;
          });
        });

    }
  }

  public addressChanged(event) {
    this._changeAddressDebounce.next(event);
  }

  public selectionChange(event) {
    const place = this.predictions.find(el => el.description === event.option.value);

    if (place && this.googlePlacesService) {
      this.googlePlacesService.getDetails(
        { placeId: place.place_id },
        (result, status) => {
          this._ngZone.run(() => {

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return;
            }

            const newAddress: FsAddress = {
              description: result.formatted_address,
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            };

            result.address_components.forEach((item) => {
              if (item.types.some(type => type === 'country')) {
                newAddress.country = { longName: item.long_name, shortName: item.short_name };
              }

              if (item.types.some(type => type === 'administrative_area_level_1')) {
                newAddress.region = { longName: item.long_name, shortName: item.short_name };
              }

              if (item.types.some(type => type === 'locality')) {
                newAddress.city = item.long_name;
              }

              if (item.types.some(type => type === 'postal_code')) {
                newAddress.zip = item.long_name;
              }
            });

            const streetNumber = result.address_components
              .find(el => el.types.some(type => type === 'street_number'));
            const streetAddress = result.address_components
              .find(el => el.types.some(type => type === 'route'));

            newAddress.street = streetAddress && streetNumber
              && streetAddress.long_name + ' ' + streetNumber.long_name
              || streetAddress && streetAddress.long_name
              || void 0;

            this.address = newAddress;

            this.selected.emit(newAddress);
          });
        });
    }
  }
}
