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
export class PageService {
page: FirebaseObjectObservable<any>;
pages: FirebaseListObservable<any>;
draftList: FirebaseListObservable<any>;
_uid;_username;pid;webblogs;
CREATE_KEY: string = 'blog_create_token';
token;blogPath;pageBlg;
  constructor(
    private af: AngularFire,
    private _notify: NotificationService,
    private router: Router,
  ) {  
     this.page = this.af.database.object(`/eStatus`, { preserveSnapshot: true });
     this.pageBlg = this.af.database.object(`/eblogs`, { preserveSnapshot: true });
     //this.page = this.af.database.list(`/eStatus`);
     this.af.auth.subscribe(user => {
       if(user) {
           this._uid = user.uid;
           this._username = user.auth.displayName;
       }});

       this.token = window.localStorage.getItem(this.CREATE_KEY);
      if(this.token){
        this.blogPath = this.af.database.object(`eblogs/${this.token}`);
      }

      this.pages = this.af.database.list('eblogs',  {
        query: {
          orderByChild: 'createdAt'
        }
      });
     

     this.webblogs =  this.af.database.list('eWebcontent',  {
        query: {
          orderByChild: 'createdAt'
        }
      });
   

  }

getDrafts(id){
   this.draftList = this.af.database.list('/eblogs', {
      query: {
        orderByChild: 'uid',
        equalTo: id
      }
    });
 return this.draftList.map(drafts => {
   return drafts;
 });
}

 getBlogs(){
   return this.pages
  .map(snapshots => {
      return snapshots;
    });
 }
 getwebBlogs(){
   return this.webblogs.map(snapshots => {
      return snapshots;
    });
 }
  getPage(id: string) {
      return this.page.map(snapshot => {
        
        return snapshot.val()[id];   
      }) 
  }
  getWebPage(wid: string){
    const pageweb = this.af.database.object(`/eWebcontent`, { preserveSnapshot: true });
    return pageweb.map(snapshot => {
        return snapshot.val()[wid];   
      }) 
  }

getPageBlg(id: string){
   return this.pageBlg.map(snapshot => {
        return snapshot.val()[id];   
    });
}


 createBlog(blogcat, blogtitle, img){
    const token = window.localStorage.getItem(this.CREATE_KEY);
      if(token) {
         return;
      } else {
          this.pid = Md5.hashStr(new Date() + this._uid);
          let path = this.af.database.object(`eblogs/${this.pid}`);
          path.set({
              pid: this.pid,
              blogCat: blogcat,
              uid: this._uid,
              photoUrl: img,
              status: 'draft',
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,
              blogTitle: blogtitle
            }).then(resolve => {
              window.localStorage.setItem(this.CREATE_KEY, this.pid);
              this._notify.successAttempt("Way to go! You're on your way to creating an awesome blog!");
            }, reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            })
            .catch(reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            });
        }
  }
 

 updateBlogDesc(blogDesc){
   const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
   path.update({
         blogDesc: blogDesc
       }).then(resolve => {
        this._notify.successAttempt("Draft Saved!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
 }

 updateBlogFull(blogFull) {
   const token = window.localStorage.getItem(this.CREATE_KEY);
    let path = this.af.database.object(`eblogs/${token}`);
   if(token){
   path.update({
         blog: blogFull
       }).then(resolve => {
        this._notify.successAttempt("Draft Saved!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
 }

publishBlog(blog, photoUrl) {
  const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
  return path.update({
         blogCat: blog.blogCat,
         blogDesc: blog.blogDesc,
         status: 'Published',
         blogTitle: blog.blogTitle,
         photoUrl: photoUrl
       }).then(resolve => {
        this.updateStatus(blog.blogCat, blog.blogDesc, photoUrl, blog.blogCat, blog.blogTitle);
        this._notify.successAttempt("Nicely Done! Blog was successfully published!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  

 }

updateBlogPhoto(url) {
  const token = window.localStorage.getItem(this.CREATE_KEY);
   let path = this.af.database.object(`eblogs/${token}`);
   if(token){
  return path.update({
         photoUrl: url
       }).then(resolve => {
        this._notify.successAttempt("Photo successfully uploaded!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
   }  
}
updateEditBlogPhoto(url, id) {
   let path = this.af.database.object(`eblogs/${id}`);
   return path.update({
         photoUrl: url
   }); 
}

updateStatus(type, status, photoUrl, contenttag, statustitle){
    const token = window.localStorage.getItem(this.CREATE_KEY);
    let path = this.af.database.object(`eStatus/${token}`);
    return path.set({
         sid: token,
         statustitle: statustitle,
         status: status,
         color: "#fff",
         uid: this._uid,
         type: type,
         rating: 0,
         photoUrl: photoUrl,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: "blog",
         contenttag: contenttag
    });
}


 updateBlogText(text, id){
    let path = this.af.database.object(`eblogs/${id}`);
     return path.update({
         blog: text
       });
 }

 updateEditedBlog(blog, id, img){
   let path = this.af.database.object(`eblogs/${id}`);
    return path.update({
         blogCat: blog.blogCat,
         blogDesc: blog.blogDesc,
         status: 'Published',
         blogTitle: blog.blogTitle,
         photoUrl: img,
         updatedAt: firebase.database.ServerValue.TIMESTAMP
       }).then(resolve => {
        this.updateStatusEdit(blog.blogCat, blog.blogDesc, img, id,  blog.blogCat, blog.blogTitle);
        this._notify.successAttempt("Nicely Done! Blog was successfully Updated!")
      }, reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
      })
      .catch(reject => {
        this._notify.errorAttempt("Ouch! something is wrong!")
    });
 }

 updateStatusEdit(type, status, photoUrl, id, contenttag, statustitle){
    let path = this.af.database.object(`eStatus/${id}`);
    return path.update({
         sid: id,
         statustitle: statustitle,
         status: status,
         color: "#fff",
         uid: this._uid,
         type: type,
         rating: 0,
         photoUrl: photoUrl,
         createdAt: firebase.database.ServerValue.TIMESTAMP,
         updatedAt: firebase.database.ServerValue.TIMESTAMP,
         tags: "blog",
         contenttag: contenttag
    });
}

delDraft(id){
  let path = this.af.database.object(`eblogs/${id}`);
  path.remove();
  this._notify.successAttempt("Draft Deleted!")
}


 createWebContent(blog, wib, img){
          let path = this.af.database.object(`eWebcontent/${wib}`);
          let contenttag = "Webcontent";
          path.set({
              pid: wib,
              blogCat: blog.blogCat,
              blogDesc: blog.blogDesc,
              videoUrl: blog.videoUrl,
              uid: this._uid,
              photoUrl: img,
              status: 'Published',
              createdAt: firebase.database.ServerValue.TIMESTAMP,
              updatedAt: firebase.database.ServerValue.TIMESTAMP,
              blogTitle: blog.blogTitle,
              blogUrl: blog.blogUrl,
              contenttag: "webcontent"
            }).then(resolve => {
              this.updateStatusEdit(blog.blogCat, blog.blogDesc, img, wib, contenttag, blog.blogTitle);
              this._notify.successAttempt("Web Content Added!");
            }, reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            })
            .catch(reject => {
              this._notify.errorAttempt("Ouch! something is wrong!")
            });
  }


}