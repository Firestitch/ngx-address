import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { } from 'googlemaps';

/*
export interface FsAddress {
    country?: {
        long?: string,
        short?: string
    }
    state?: string,
    address?: string,
    city?: string,
    zip?: string
}
*/
@Injectable()
export class FsAddressService {
    /*
    public geocoder: google.maps.Geocoder;
    public mapElem: any;
    public map: any;
    private marker: google.maps.Marker;
    private defaultPoint: google.maps.LatLng;

    public init() {
        this.initMap();
        this.initGeocoder();
        this.setMarker(this.defaultPoint);
    }

    // just a small fun feature for filling in state/zip/country/city out of address. This is not exacly percise and user, 
    // of course, has his own ways of inputting it. but gmaps return this data with the simpliest address geocoder request, 
    // so why not utilise it :)
    public parseAddress(address: google.maps.GeocoderResult): FsAddress {
        let fsAddress: FsAddress = {
            address: address.formatted_address
        }
        address.address_components.forEach(gAddress => {
            if (!fsAddress.country && gAddress.types.indexOf('country') >= 0) {
                fsAddress.country = {
                    long: gAddress.long_name,
                    short: gAddress.short_name
                }
            } else if (
                gAddress.types.indexOf('locality') >= 0 ) {
                fsAddress.city = gAddress.long_name
            } else if (
                (gAddress.types.indexOf('administrative_area_level_1') >= 0 )) {
                fsAddress.state = gAddress.long_name
            } else if (!fsAddress.zip && gAddress.types.indexOf('postal_code') >= 0) {
                fsAddress.zip = gAddress.long_name
            }
        })
        return fsAddress;
    }

    public setMarker(position: google.maps.LatLng) {
        if (this.marker) {
            this.marker.setMap(null); // remove marker
        }

        this.marker = new google.maps.Marker({
            position: position,
            map: this.map
        });
    }

    private initMap() {
        this.defaultPoint = new google.maps.LatLng(43.653908, -79.384293);
        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: this.defaultPoint
        });
    }

    private initGeocoder() {
        this.geocoder = new google.maps.Geocoder();
    }

    public getGeocode(address: string) {
        return new Observable(observer => {
            this.geocoder.geocode({ 'address': address }, (results, status: any) => {
                if (status === 'OK') {
                    this.map.setCenter(results[0].geometry.location);
                    observer.next(results);
                } else {
                    observer.error('Error getting geocode results!');
                }
            });
        })
    }
    */
}
