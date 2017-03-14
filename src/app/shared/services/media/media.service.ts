import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
   import { Router } from '@angular/router';
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
import { NotificationService } from '../notification/notification.service'
@Injectable()
export class MediaService {
_uid;_username;pid;
  constructor(
    private af: AngularFire,
    private _notify: NotificationService,
    private router: Router,
  ) { 
    this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});
  }
getAudios() {
 const audioList = this.af.database.list('eAudios',  {
      query: {
        orderByChild: 'createdAt'
      }
    });
   return  audioList
  .switchMap(audios => {
    let userObservables = audios.map(audio => this.af.database.object(`eusers/${audio.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        audios.forEach((audio, index) => {
          audio.username = eusers[0][index].name;
          audio.avatar = eusers[0][index].avatar;
        });
        return audios.reverse();          
      });
  });
}

getAudio(mid){
  const Audio = this.af.database.object(`/eAudios`, { preserveSnapshot: true });
  return Audio.map(snapshot => {
        return snapshot.val()[mid];   
      }) 
}


addMuisc(upload, token, url, ext, file_type){
    let path = this.af.database.object(`eAudios/${token}`);
          path.set({
              mid: token,
              country: upload.uploadCountry,
              uid: this._uid,
              src: url,
              filename: upload.uploadName,
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,
              type: file_type
            }).then(resolve => {
              this.updateStatus(token, url, upload.uploadName, upload.uploadCountry, file_type);
              window.localStorage.removeItem('upload_file');
              this._notify.successAttempt("Way to go! You're on your file has been successfully uploaded!");
            }, reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            })
            .catch(reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
        });
}

 updateStatus(id, src, status, type, file_type){
    let path = this.af.database.object(`eStatus/${id}`);
    return path.update({
         sid: id,
         status: status,
         color: "#fff",
         uid: this._uid,
         type: "Audio",
         country: type,
         rating: 0,
         src: src,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: file_type,
         contenttag: "Audio"
    });
}

}
