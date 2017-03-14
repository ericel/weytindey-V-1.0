import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AngularFire, AuthProviders, AuthMethods,  FirebaseListObservable,  FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';
@Injectable()
export class EasyapiService {
   api_url: FirebaseObjectObservable<any>;
  constructor(private http: Http, private af: AngularFire) {

  }
  
  push(path:string, body){
     this.api_url = this.af.database.object(`${path}`);
     return this.api_url.set({ body });
  }
}
