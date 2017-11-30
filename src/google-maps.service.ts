import { Observable } from 'rxjs/Observable';
import { FsAddressService } from './fsaddress.service';
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { } from '@types/googlemaps';
import 'rxjs/add/operator/map';

@Injectable()
export class FsGoogleMapsService {
    constructor(
        private addressService: FsAddressService,
        private http: Jsonp
    ){}

    public getAddresssPredictions(address: string): Observable<any> {
        let key = this.addressService.key;
        console.log('req',`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=geocode&language=ru&key=${key}` );
        return this.http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${address}&types=geocode&callback=JSONP_CALLBACK&language=ru&key=${key}`).map(data => {
            console.log('data', data);
        });
    }
}
