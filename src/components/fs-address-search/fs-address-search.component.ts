import {
  ChangeDetectorRef,
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
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/delay';
import { FsAddress } from '../../interfaces/address.interface';


@Component({
  selector: 'fs-address-search',
  templateUrl: './fs-address-search.component.html',
  styleUrls: ['./fs-address-search.component.scss'],
})
export class FsAddressSearchComponent implements OnInit, OnDestroy {

  @Input() address: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  // Address Predictions
  public predictions: google.maps.places.AutocompletePrediction[] = [];

  @ViewChild('search')
  public searchElement: ElementRef;

  // Google
  public googleAutocompleteService: google.maps.places.AutocompleteService;
  public googlePlacesService: google.maps.places.PlacesService;

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.googleMapsInit();

    if (this.address) {
      this.getAddressPredictions(this.address);
    }
  }

  public ngOnDestroy() {}

  private googleMapsInit() {
    this._mapsAPILoader
      .load()
      .then(() => {
        this.googleAutocompleteService = new google.maps.places.AutocompleteService();
        this.googlePlacesService = new google.maps.places.PlacesService(this.searchElement.nativeElement);
      });
  }

  public getAddressPredictions(value) {
    if (value && this.googleAutocompleteService) {

      this.googleAutocompleteService.getPlacePredictions(
        {input: value},
        (predictions, status) => {
          this.predictions.length = 0;

          if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          this.predictions = predictions;

          this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
        });
    }

  }

  public selectionChange(event) {
    const place = this.predictions.find(el => el.description === event.option.value);

    if (place && this.googlePlacesService) {
      this.googlePlacesService.getDetails(
        { placeId: place.place_id },
        (result, status) => {
          if (status != google.maps.places.PlacesServiceStatus.OK) {
            return;
          }

          let newAddress: FsAddress = {
            name: place && place.description,
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng()
          };

          result.address_components.forEach((item) => {
            if (item.types.some(type => type === 'country')) {
              newAddress.country = { longName: item.long_name, shortName: item.short_name };
            }

            if (item.types.some(type => type === 'administrative_area_level_1')) {
              newAddress.state = { longName: item.long_name, shortName: item.short_name };
            }

            if (item.types.some(type => type === 'administrative_area_level_2')) {
              newAddress.region = { longName: item.long_name, shortName: item.short_name };
            }

            if (item.types.some(type => type === 'route')) {
              newAddress.address = item.long_name;
            }

            if (item.types.some(type => type === 'postal_code')) {
              newAddress.zip = item.long_name;
            }
          });

          const streetNumber = result.address_components.find(el => el.types.some(type => type === 'street_number'));
          const city = result.address_components.find(el => el.types.some(type => type === 'locality'));
          newAddress.city = city && streetNumber && city.long_name + ' ' + streetNumber.long_name || city && city.long_name || void 0;

          this.select.emit(newAddress);
          this._cdRef.detectChanges(); // TODO change to better emit of change. Without - DOM doesn't change
        });
    }
  }
}
