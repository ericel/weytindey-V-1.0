import { Injectable } from '@angular/core';
import { Status } from '../../../store';
import { StoreHelper } from './../store-helper';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
import { MapsAPILoader } from 'angular2-google-maps/core';
import 'rxjs/Rx';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {Md5} from 'ts-md5/dist/md5';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Http} from '@angular/http';
import { NotificationService } from '../notification/notification.service'
//import { ApiService } from './api';

@Injectable()
export class StatusService {
path:any;
urlService: 'eStatus';
_uid;
_username;
user: {};
_tags;
projectWithUserList;
private isloggedIn = new BehaviorSubject(false);
statusList: FirebaseListObservable<any[]>;
  constructor(
    private storeHelper: StoreHelper,
    private af: AngularFire,
    private _http: Http,
    private _notify: NotificationService
  ) {

    this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});
    
    this.statusList = this.af.database.list('eStatus',  {
      query: {
        orderByChild: 'createdAt'
      }
    });

  }




createStatus(status, color, tags, type) {
   if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can create status!");
     return;
   }
     let sid = Md5.hashStr(new Date() + status + color + this._uid);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: status,
         color: color,
         uid: this._uid,
         type: type,
         rating: 0,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: tags,
         contenttag: type
       }).then(resolve => {
        this._notify.countDown('/content/status-update', sid, status); 
      }, reject => {
        this._notify.errorAttempt("Ouch! status couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! status couldn't be added!")
      });
  }
createQuestion( question, tags, color, type ) {
   if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can ask questions!");
     return;
   }
     let sid = Md5.hashStr(new Date() + this._uid);
     this.path = this.af.database.object(`eStatus/${sid}`);
    return this.path.set({
         sid: sid,
         status: question,
         color: color,
         uid: this._uid,
         type: type,
         rating: 0,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: tags,
         contenttag: type
      }).then(resolve => {
        this._notify.countDown('/content/question', sid, question); 
      }, reject => {
        this._notify.errorAttempt("Ouch! question couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! question couldn't be added!")
      });
}

createComment( comment, sid) {
   if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can Comment!");
     return;
   }
     let cid = Md5.hashStr(new Date() + this._uid + sid);
     this.path = this.af.database.object(`eComments/${cid}`);
      return this.path.set({
          cid: cid,
          sid: sid,
          comment: comment,
          uid: this._uid,
          rating: 0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          updatedAt: firebase.database.ServerValue.TIMESTAMP,
        })
      .then(resolve => {
      }, reject => {
        this._notify.errorAttempt("Ouch! comment couldn't be added!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! comment couldn't be added!")
      }); 
}
getStatus() {
  return  this.statusList
  .switchMap(statuses => {
    let userObservables = statuses.map(status => this.af.database.object(`eusers/${status.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        statuses.forEach((status, index) => {
          status.username = eusers[0][index].name;
          status.avatar = eusers[0][index].avatar;
        });
        return statuses.reverse();          
      });
  });

  }
  
  getComments(sid) {
  const commentList = this.af.database.list('/eComments', {
      query: {
        orderByChild: 'sid',
        equalTo: sid
      }
    });
    
   return  commentList
  .switchMap(comments => {
    let userObservables = comments.map(status => this.af.database.object(`eusers/${status.uid}`)
    );
    return Observable.combineLatest(...userObservables)
      .map((...eusers) => {
        comments.forEach((comment, index) => {
          comment.username = eusers[0][index].name;
          comment.avatar = eusers[0][index].avatar;
        });
        return comments;          
      });
  });

  }

  rateStatus(status: Status) {
    if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can Vote!");
     return;
   }
  if(this._uid === status.uid){
     this._notify.failedAttempt("You can't vote your own status!");
     return;
   }

    this.path = this.af.database.object(`eStatus/${status.sid}`);
    let rStatusUser = this.af.database.object(`eStatusRaters/${status.sid}`);
    rStatusUser.first().subscribe(value => {
      if(value[this._uid]){
        this._notify.failedAttempt("You already voted this thread!");
        return;
      } else {
        rStatusUser.update({
           [this._uid]: true,
           sid: status.sid
        }) 
        .then(_ =>  this.path.update({ rating: status.rating + 1}))
        .catch(err => this._notify.failedAttempt("Ouch! Something bad has happened!")); 
      }
    });  
  }
  
  upVoteComment(comment){
  if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can Vote!");
     return;
   }

  if(this._uid === comment.uid){
     this._notify.failedAttempt("You can't upvote your own comment!");
     return;
   }
   const cpath = this.af.database.object(`eComments/${comment.cid}`);
   const path = this.af.database.object(`eCommentRaters/${comment.cid}`);
   path.first().subscribe(value => {
      if(value[this._uid]){
        this._notify.failedAttempt("You already voted up this thread!");
        return;
      } else {
        path.update({
           [this._uid]: true,
           sid: comment.sid
        }) 
        .then(_ =>  cpath.update({ rating: comment.rating + 1}))
        .catch(err => this._notify.failedAttempt("Ouch! Something bad has happened!")); 
      }
    });  
  }
 downVoteComment(comment){
   if(!this._uid){
     this._notify.failedAttempt("Only Authenticated Users can Vote!");
     return;
   }

    if(this._uid === comment.uid){
     this._notify.failedAttempt("You can't downvote your own comment!");
     return;
   }

   const cpath = this.af.database.object(`eComments/${comment.cid}`);
   const path = this.af.database.object(`eCommentRaters/${comment.cid}`);
   path.first().subscribe(value => {
      if(value[this._uid] === false){
        this._notify.failedAttempt("You already voted down this thread!");
        return;
      } else {
        path.update({
           [this._uid]: false,
           sid: comment.sid
        }) 
        .then(_ =>  cpath.update({ rating: comment.rating - 1}))
        .catch(err => this._notify.failedAttempt("Ouch! Something bad has happened!")); 
      }
    });  
  }
  sDelete(sid){
    
    if(sid){
    const path = this.af.database.object(`eStatus/${sid}`);
    path.remove();
    const blogPath = this.af.database.object(`eblogs/${sid}`);
    if(blogPath){
      blogPath.remove();
    }
    const webPath = this.af.database.object(`eWebcontent/${sid}`);
    if(webPath){
      webPath.remove();
    }
    const audioPath = this.af.database.object(`eAudios/${sid}`);
    if(audioPath){
      audioPath.remove();
    }
    const commentList = this.af.database.list('/eComments', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'sid',
        equalTo: sid
      }
    });
    commentList.subscribe(snapshots=>{
    snapshots.forEach(snapshot => {
      snapshot.ref.remove();
    });
    return;
   });

    const raterscommentList = this.af.database.list('/eCommentRaters', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'sid',
        equalTo: sid
      }
    });
     raterscommentList.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          snapshot.ref.remove();
        });
      });

     const raterStatus = this.af.database.list('/eStatusRaters', {
      preserveSnapshot: true,
      query: {
        orderByChild: 'sid',
        equalTo: sid
      }
    });
    raterStatus.subscribe(snapshots=>{
        snapshots.forEach(snapshot => {
          snapshot.ref.remove();
        });
      });
   
    let storageRefAudio = firebase.storage().ref().child(`eAudio/${sid}`);
    if(storageRefAudio){
      storageRefAudio.delete().then(function() {
        //this._notify.successAttempt("File Was successfully deleted!");
      }).catch(function(error) {
        //this._notify.errorAttempt("Ouch! Something bad has happened!"); 
      });
    }
    let storageRefWebcontent = firebase.storage().ref().child(`eWebcontent/${sid}`);
    if(storageRefWebcontent){
      storageRefWebcontent.delete().then(function() {
        //this._notify.successAttempt("File Was successfully deleted!");
      }).catch(function(error) {
        //this._notify.errorAttempt("Ouch! Something bad has happened!"); 
      });
    }
    let storageRefBlogs = firebase.storage().ref().child(`eblogs/${sid}`);
    if(storageRefBlogs){
      storageRefBlogs.delete().then(function() {
        //this._notify.successAttempt("Blog Was successfully deleted!");
      }).catch(function(error) {
        //this._notify.errorAttempt("Ouch! Something bad has happened!"); 
      });
    }
  }

  }

 deleteUnUploadedFile(){
  const token = window.localStorage.getItem("upload_file");
    let storageRefAudios = firebase.storage().ref().child(`eAudio/${token}`);
    if(storageRefAudios){
      storageRefAudios.delete().then(function() {
        window.localStorage.removeItem("upload_file");
        return
      }).catch(function(error) {
        //this._notify.errorAttempt("Ouch! Something bad has happened!"); 
        return;
      });
    }
}
  
}
