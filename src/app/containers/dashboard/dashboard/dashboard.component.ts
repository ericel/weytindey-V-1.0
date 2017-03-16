import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../shared/services/status/status.service';
import { PageService } from '../../../shared/services/page/page.service';
import { MediaService } from '../../../shared/services/media/media.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { MessengerService } from '../../../shared/services/messenger/messenger.service';

import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
dashboard: boolean = true;
blogsAdded;blogsOff: boolean = false;
webcontentOff;webblogsAdded;audios;
musicsOff: boolean = false;
questionOff: boolean = false;
updatess; questionss;updatesOff: boolean = false;
usersOff: boolean = false;
userss;
lockOpen: boolean = false;
lock_key: string = "198762wey";
lockForm : FormGroup;
contactUserOpen: boolean = false;
contactMessages;
showcountMsg: boolean = false;
user: any;
  constructor(
    private _statusService: StatusService,
    private _pageService: PageService,
    private _dialog: MdDialog,
    private _mediaService: MediaService,
    private _authService: AuthService,
    private fb: FormBuilder,
    private _messengerService: MessengerService
  ) { }

  ngOnInit() {
     this.lockForm = this.fb.group({
      'lockKey': [null,  Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(9)])]
     });
      this.lockForm.controls["lockKey"].valueChanges
     .debounceTime(1000) // wait a litle after the user input (ms)
     .subscribe(lockKey => {
        if(lockKey === this.lock_key){
         this.lockOpen = true;
        }
     });
    this._pageService.getBlogs().subscribe(blogs => {this.blogsAdded = blogs;});
    this._pageService.getwebBlogs().subscribe(webblogs => {this.webblogsAdded = webblogs;});
    this._mediaService.getAudios().subscribe(audios => {this.audios = audios;});
    this._statusService.getStatus().subscribe(statuses => {
     this.questionss =  statuses.filter(function(a){
            return a.contenttag === "Question";
     });
     this.updatess =  statuses.filter(function(a){
            return a.contenttag === "Status Update";
     });
    });
    this._authService._isUsers().subscribe(users => {this.userss = users;});

   
  }
  blogs(){
    this.dashboard = false;
    this.webcontentOff = false;
    this.musicsOff = false;
    this.questionOff = false;
    this.updatesOff = false;
    this.usersOff = false;
    this.blogsOff = true;
  }
  webcontent(){
    this.dashboard = false;
    this.blogsOff = false;
    this.musicsOff = false;
    this.questionOff = false;
    this.updatesOff = false;
    this.usersOff = false;
    this.webcontentOff = true;
  }
  music(){
    this.dashboard = false;
    this.blogsOff = false;
    this.webcontentOff = false;
    this.questionOff = false;
    this.updatesOff = false;
    this.usersOff = false;
    this.musicsOff = true;
  }
  questions(){
    this.dashboard = false;
    this.blogsOff = false;
    this.webcontentOff = false;
    this.musicsOff = false;
    this.updatesOff = false;
    this.usersOff = false;
    this.questionOff = true;
  }
  updates(){
    this.dashboard = false;
    this.blogsOff = false;
    this.webcontentOff = false;
    this.musicsOff = false;
    this.questionOff = false;
    this.usersOff = false;
    this.updatesOff = true;
  }
   users(){
    this.dashboard = false;
    this.blogsOff = false;
    this.webcontentOff = false;
    this.musicsOff = false;
    this.questionOff = false;
    this.updatesOff = false;
    this.usersOff = true;
  }
  contactUser(uid: string){
    this._authService.userById(uid).subscribe(user => {
      this.user = user;
    });
    this.contactUserOpen = true;
  }
  chatChecked(event){
    this.contactUserOpen = false;
  }
  overUser(useruid: string){
    this.showcountMsg = true;
     this._messengerService.getContactMessages().subscribe(messages => {
   
     this.contactMessages =  messages.filter(function(a){
            return a.mid === "ms_"+useruid;
      });
    });
  }
}
