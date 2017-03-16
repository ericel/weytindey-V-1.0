import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
   import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service'
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable()
export class MessengerService {
_uid;_username;
  constructor(
    private af: AngularFire,
    private router: Router,
    private _notify: NotificationService,
  ) {
     this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
     }});
   }
contact(message){
  let token =  Md5.hashStr(new Date() + this._uid);
  let path = this.af.database.object(`eContact/${token}`);
  path.set({
             cid: token,
             uid: this._uid,
             mid: "ms_"+this._uid,
             con_type: "sender_main",
             message: message.message,
             read: false,
             createdAt: firebase.database.ServerValue.TIMESTAMP
            }).then(resolve => {
            }, reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            })
            .catch(reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
        });
}

getContactMessages() {
 const contactMessList = this.af.database.list('eContact',  {
      query: {
        orderByChild: 'createdAt'
      }
    });
   return contactMessList
   .switchMap(messages => {
    let userObservables = messages.map(message => this.af.database.object(`eusers/${message.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        messages.forEach((message, index) => {
          message.username = eusers[0][index].name;
          message.avatar = eusers[0][index].avatar;
        });
        return messages;          
      });
  });
}
}
