import { Injectable, inject } from '@angular/core';

import { FsMap } from '@firestitch/map';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class FsAddressGeocoder {
  private _map = inject(FsMap);


  public lookup(address: string): Observable<google.maps.GeocoderResult[]> {
    return new Observable((observer) => {
      this._map.loaded$
        .pipe(
          delay(1010),
        )
        .subscribe(() => {
          const geocoder = new google.maps.Geocoder();
          const request: google.maps.GeocoderRequest = {
            address,
          };
      
          geocoder.geocode(request, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              observer.next(results);
              observer.complete();
            } else if (status === google.maps.GeocoderStatus.ZERO_RESULTS) {
              observer.error('Bad destination address.');
            } else {
              observer.error('Error calling Google Geocode API.');
            }
          });
        });
    });
  }

}
