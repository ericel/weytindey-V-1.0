import {Location} from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from './../../../store';
import { StoreHelper } from './../store-helper';
import { ApiService } from './../api/api.service';
import { EasyapiService } from './../easyapi/easyapi.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods,  FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/throw';
@Injectable()
export class AuthService implements CanActivate {
  LOGIN_KEY: string = 'access_token';
  UID_KEY: string = '';
  userAuth: any;
  api_url: FirebaseObjectObservable<any>;
  path: string = 'eusers';
  user: {};
  users: any;
  usersList: any;
  _getusersHere;
  constructor(
    private router: Router,
    private store: Store,
    private storeHelper: StoreHelper,
    private api: ApiService,
    private easyApi: EasyapiService,
    private af: AngularFire,
    private _location: Location
    ) {
   
    this.userAuth = this.af.auth.map(auth => {
       if(auth) {
           return auth;
       } else {
           return false;
       }});
    this.users = this.af.database.object(`/eusers`, { preserveSnapshot: true });
    this.usersList = this.af.database.list(`/eusers`);
    this._getusersHere = this.users.map(snapshot => {
        return snapshot.val();
      });
    }


canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.af.auth.map((auth) =>  {
      if(auth == null) {  
        this.router.navigate(['/authentication']);
        return false;
      } else {
        return true;
      }
    }).first()
  }
 
  login(provider: string) {
    this.af.auth.login({
      provider: this._getProvider(provider)
    }).then(
        (success) => {
       this.authenticate(success);
   })
   return;
  }

  authenticate(user: any): any {
     if(!user) {
      return {};
    } else {
    let data = user.auth.providerData[0];
    this.api_url = this.af.database.object(`${this.path}/${user.auth.uid}`);
     this._isUsers().first().subscribe(value => {
 
       var filtered =  value.filter(function(item) {
            return item.uid === user.auth.uid;
        });
        if(filtered.length > 0){this._updateLogIn(this.api_url, data); return; }
        else{ this._addUser(this.api_url, user, data); return;
           }
        
      });
     return;
    }
  }
 
  _isUsers(){
   return this.usersList.map(snapshot => {
         return snapshot;
     });
  }
  private _updateLogIn(thisurl, data) {
    return thisurl.update({ 
        lastLogIn: firebase.database.ServerValue.TIMESTAMP,
        avatar: data.photoURL
      }).then((success) => {
        console.log("successfully logged in!");
      });
  }
  private _addUser(thisurl, user, data){
    return thisurl.set({
          name: data.displayName,
          username: data.displayName.replace(/ /g,"."),
          avatar: data.photoURL,
          email: data.email,
          provider: data.providerId,
          uid: user.auth.uid,
          type: 'a',
          joinAt: firebase.database.ServerValue.TIMESTAMP,
          city: 'city',
          country: 'Country',
          bio: 'say something about you!',
          job: 'Occupation',
          lastUpdate: firebase.database.ServerValue.TIMESTAMP,
          lastLogIn: firebase.database.ServerValue.TIMESTAMP
      }).then((success) => {
        console.log("successfully signed up!");
        return;
      }); 
 }
 

 _isInArray(source, id) {
    return source.filter(function( obj ) {
        // coerce both obj.id and id to numbers 
        // for val & type comparison
        return +obj.uid === +id;
    })[ 0 ];
  }
  userById(id: string){
    return this.users.map(snapshot => {
      if(!snapshot.val()){
           this.router.navigate(['/notfound404']);
        }
        return snapshot.val()[id];   
      });
  }

  checkThisLoginUserIs(id: string){
  return this.af.auth.map(auth => {
    if(auth){
       if(auth.uid === id) {
           return true;
       } else {
           return false;
   }}});  
  } 

  updateUser(id, value){
    const user = this.af.database.object(`${this.path}/${id}`);
    return user.update({ 
      bio: value.bio,
      job: value.job,
      country: value.country,
      city: value.city,
      lastUpdate: firebase.database.ServerValue.TIMESTAMP
    });
  }
  logout() {
    this.af.auth.logout();
    this.store.purge();
  }

   private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}
