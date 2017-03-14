/**
 * ANGULAR 2 MAPS
 * Google Maps JavaScript API in the new Angular 2 applications using TypeScript
 * written by Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular2maps
 */

import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
/**
 * GeolocationService class.
 * https://developers.google.com/maps/documentation/javascript/
 * https://dev.w3.org/geo/api/spec-source.html
 * 
 * @author Roberto Simonetti
 */
@Injectable() export class GeolocationService {

    constructor(private _http: Http) { }

    /**
     * Tries HTML5 geolocation.
     * 
     * Wraps the Geolocation API into an observable.
     * 
     * @return An observable of Position
     */
    getCurrentPosition(): Observable<Position> {

        return new Observable((observer: Observer<Position>) => {

            // Invokes getCurrentPosition method of Geolocation API.
            navigator.geolocation.getCurrentPosition(

                // Success callback.
                (position: Position) => {

                    observer.next(position);
                    observer.complete();

                },

                // Error callback.
                (error: PositionError) => {

                    //console.log('Geolocation service: ' + error.message);

                    observer.error(error);


                }

            );

        });

    }

   getCurrentLocation(lat: any, long: any): Observable<any> {
        return this._http.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false`)
        .map(response => response.json())
        .catch(error => {
            //console.log(error);
            //return Observable.throw(error.json());
            return "not_found";
        });
  }

  getCurrentIpLocation(): Observable<any> {
        return this._http.get('https://ipinfo.io')
        .map(response => response.json())
        .catch(error => {
            console.log(error);
            return Observable.throw(error.json());
        });
    }

}
