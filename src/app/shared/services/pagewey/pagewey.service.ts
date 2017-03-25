import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, 
  AuthMethods,  FirebaseListObservable,
   FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { NotificationService } from '../notification/notification.service';
@Injectable()
export class PageweyService {

  constructor(
    private af: AngularFire,
    private _notify: NotificationService,
    private router: Router,
  ) { }


  createPage(page){
    
  }
}
