import { MapsAPILoader } from '@agm/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FsAddressGeocoder {

  public constructor(
    private _mapsAPILoader: MapsAPILoader,
  ) {}

  public lookup(address: string): Observable<google.maps.GeocoderResult[]> {
    return new Observable((observer) => {
      this._mapsAPILoader
        .load()
        .then(() => {
          const geocoder = new google.maps.Geocoder();
          const request: google.maps.GeocoderRequest = {
            address,
          };
      
          geocoder.geocode(request, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              observer.next(results);
              observer.complete();
            } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
              observer.error("Bad destination address.");
            } else {
              observer.error("Error calling Google Geocode API.");
            }
          });
        });
      });
  }

}