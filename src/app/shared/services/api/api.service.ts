import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods,  FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  apiUrl;
  api_url: string = 'https://enoeasy-94b34.firebaseio.com/';
  //api_url: FirebaseListObservable<any>;
  constructor(private http: Http, private af: AngularFire) {
    this.apiUrl = af.database.list('/');
    //this.api_url.set({ name: 'new name!'});
  }

  private getJson(response: Response) {
    return response.json();
  }

  private checkForError(response: Response): Response {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      var error = new Error(response.statusText)
      error['response'] = response;
      console.error(error);
      throw error;
    }
  }
  set(path: string, body){
    let thisUrl = this.af.database.object(`${path}`);
    return thisUrl.set({
            body
    });
  }
  get(path: string): Observable<any> {
    return this.http.get(`${this.api_url}${path}.json`, { headers: this.headers })
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }
  
  post(path: string, body): Observable<any> {
    return this.http.post(
      `${this.api_url}${path}.json`,
      JSON.stringify(body),
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${this.api_url}${path}.json`,
      { headers: this.headers }
    )
    .map(this.checkForError)
    .catch(err => Observable.throw(err))
    .map(this.getJson)
  }

  setHeaders(headers) {
    Object.keys(headers).forEach(header => this.headers.set(header, headers[header]));
  }
}
