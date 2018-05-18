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
  public predictions: any[] = [];

  @ViewChild('search')
  public searchElement: ElementRef;

  // Google
  public googleAutocompleteService = null;
  public googlePlacesService = null;

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

  public change(event) {
    event.stopPropagation();
  }

  public selectionChange(event) {

    const place = this.predictions.find(el => el.description === event.option.value);

    const newAddress: FsAddress = {
      description: place.description
    };


    if (place && this.googlePlacesService) {
      this.googlePlacesService.getDetails(
        { placeId: place.place_id },
        (result, status) => {
          this._ngZone.run(() => {

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              return;
            }

            newAddress.lat = result.geometry.location.lat();
            newAddress.lng = result.geometry.location.lng();

            let countryLongName, regionLongName, streetShortName;

            result.address_components.forEach((item) => {
              if (item.types.some(type => type === 'country')) {
                newAddress.country = item.short_name;
                countryLongName = item.long_name;
              }

              if (item.types.some(type => type === 'administrative_area_level_1')) {
                newAddress.region = item.short_name;
                regionLongName = item.long_name;
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

            if (streetNumber) {
              newAddress.street = streetNumber.long_name + ' ';
              streetShortName = streetNumber.long_name + ' ';
            } else {
              const match = newAddress.description.match(/^[\d-]+/);
              if (match) {
                newAddress.street = match[0] + ' ';
                streetShortName = match[0] + ' ';
              }
            }

            const streetAddress = result.address_components
              .find(el => el.types.some(type => type === 'route'));

            if (streetAddress) {
              if (!newAddress.street) {
                newAddress.street = streetAddress.long_name;
                streetShortName = streetAddress.short_name;
              } else {
                newAddress.street += streetAddress.long_name;
                streetShortName += streetAddress.short_name;
              }
            }
            debugger;
            if (newAddress.country !== result.name &&
                countryLongName !== result.name &&
                newAddress.region !== result.name &&
                regionLongName !== result.name &&
                newAddress.city !== result.name &&
                streetShortName !== result.name &&
                newAddress.zip !== result.name &&
                newAddress.street !== result.name) {
              newAddress.name = result.name;
            } else {
              newAddress.name = '';
            }

            this.address = newAddress;

            this.selected.emit(newAddress);
          });
        });
    }
  }
}
