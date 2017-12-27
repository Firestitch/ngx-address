import { Observable } from 'rxjs/Observable';
import { FsAddressService } from './fsaddress.service';
import { Injectable, Inject } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { } from '@types/googlemaps';
import 'rxjs/add/operator/map';

@Injectable()
export class FsGoogleMapsService {
    constructor(
        private addressService: FsAddressService,
        private http: Jsonp,
        @Inject('FsAddressGoogleMapKey') FsAddressGoogleMapKey
    ) { }

    public getAddresssPredictions(address: string): Observable<any> {
        let key = this.FsAddressGoogleMapKey;
        let url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=geocode&callback=JSONP_CALLBACK&language=ru&key=${key}`;
        return this.http.get(url).map(data => {

        });
    }
}
