import { Component, OnInit, Output, EventEmitter, Optional} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StatusService } from '../../services/status/status.service';
import { GeolocationService } from '../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-questioncard',
  template: `
  <div  class="updatestatus">
  <div *ngIf="isAuthorized" class="auth-010">
    <span><img md-card-avatar src="{{user.auth.photoURL}}"></span>
    <span class="span">{{ user.auth.displayName | shorten: 8: ' ' }} <i class="fa fa-caret-right" aria-hidden="true"></i></span>
    <span class="span"><strong>Public</strong></span>
   </div>
   <div class="close"> <button  md-button color="primary" (click)="close()">X</button></div>
   <md-card>
    <div *ngIf="addedSuccess" class="wait">
        <md-progress-spinner mode="indeterminate" color="primary"></md-progress-spinner>
     <div class="alert alert-success" role="alert">
      <strong>Well done!</strong> You successfully asked a question.
    </div>
    <div id="countdown"></div>
    </div>
     <form [class.blur]="addedSuccess" *ngIf="isAuthorized" (ngSubmit)="onAskQuestion()">
     <div *ngIf="errorQuestion" class="alert alert-danger" role="alert">
       <strong>Error: </strong>Question Should be between 20 - 100 Characters!
     </div>
     <div *ngIf="errorTags" class="alert alert-danger" role="alert">
       <strong>Error: </strong>At least 1 tags is needed!
     </div>
      
    <div class="form-group">
      <textarea autofocus class="form-control" 
      aria-label="Ask a Question"
      [(ngModel)]="newQuestion.question"
      name="question"
      placeholder="Ask your Question"
      ></textarea>
      <tag-input [(ngModel)]='newQuestion.tags'
       name="tags" 
      id="tags"
      [maxItems]="4"
      separatorKeys="[32]"
      ></tag-input>
      <small class="tags-01 pull-left">type a tag and hit shift or enter key</small>
     
      <button md-raised-button color="primary" type="submit" class="pull-right">post question</button>
     </div>
  </form>
  <div *ngIf="!isAuthorized" class="not-auth color-primary" routerLink="/authentication">Click Here Log In to Post! It's easy and fast.</div>
  </md-card>
  </div>

  `,
  styleUrls: ['./creators.css']
  /*<tag-input [(ngModel)]='newQuestion.tags'
       name="tags" 
      id="tags"
      [maxItems]="4"
      separatorKeys="[32]"
      ></tag-input>
      <small class="tags-01 pull-left">type a tag and hit shift or enter key</small>*/
})
export class QuestionCard implements OnInit {
 @Output() createQuestion = new EventEmitter();
 isAuthorized: boolean = false;
 user;
 tags;
 errorQuestion: boolean = false;
 errorTags: boolean = false;
 addedSuccess: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
 newQuestion = {
    question: '',
    tags: '',
    color: '#fff'
  };
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog,
    private statusService: StatusService,
    ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });

       this._GeolocationService.getCurrentIpLocation().subscribe( value => {
         this.tags = [value.city, value.country, 'status updates'];
          this.newQuestion = {
            question: '',
            tags: '',
            color: '#fff'
          };
       });
  }
  
  onAskQuestion() {
    this.errorQuestion = false;
    this.errorTags = false;
    const { question, tags, color } = this.newQuestion;
    if(!question){
      this.errorQuestion = true;
    } else if(!tags) {
      this.errorTags = true;
    } else {
      this.errorQuestion = false;
      this.errorTags = false;
    }
    if (question && tags) {
      let type = "Question";
     this.statusService.createQuestion( question, tags, color, type );
      
       var i = 5;
       var myinterval = setInterval(() => {
       this.addedSuccess = true;
        if (i === 0) {
            clearInterval(myinterval );
            this.reset();
            this.close(); 
        }
        else {
            i--;
        }
     }, 1000);
    }
  }

  reset() {
    this.newQuestion = {
      question: '',
      tags: '',
      color: '#fff'
    };
  }

   close() {
      this._dialog.closeAll();
  }
}

