import { Component, OnInit, Output, EventEmitter, Optional, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { GeolocationService } from '../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { StatusService } from '../../services/status/status.service';
@Component({
  //(click)="toggleStatus()"
  /*<span routerLink="/add" mdTooltip="Share a File">
         <i class="fa fa-share-alt-square fa-2x color-primary" aria-hidden="true"></i> 
     </span>
     */
  selector: 'app-updatecard',
  template: `
  <div  class="no-sm">
   <md-card>
     <span mdTooltip="Update Status" (click)="openDialogStatus()">
         <i class="fa fa-commenting-o fa-2x" color="primary"  aria-hidden="true"></i>
     </span>
     
     <span routerLink="/add" mdTooltip="Start an Action">
         <i class="fa fa-free-code-camp fa-2x color-red" aria-hidden="true"></i>
     </span>
     <span (click)="openDialog()" mdTooltip="Ask a Question">
         <i class="fa fa-question fa-2x" aria-hidden="true"></i>
     </span>

     <span  routerLink="/media/upload" mdTooltip="Upload music">
         <i class="fa fa-upload fa-2x" aria-hidden="true"></i>
     </span>
     
     <div class="clearfix"></div>
   </md-card>
  </div>
  `,
   styles: [`
  @media screen and (min-width: 769px){
    .no-sm {
    padding: 0 13px;
  }
  }
 
  md-card {
      margin: 0px 0 10px 0;
      clear:both;
      border-radius: 0 !important;
      box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12) !important;
      border-bottom: 2px solid #0097A7 !important;
  }
  @media screen and (min-width: 769px){
   md-card {
      border-radius: 4px !important;
      display: flex;
      margin-top: 10px;
  }
  }
  md-card span {
    width: 25%;
    float: left;
    text-align: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    cursor: pointer;
    color: #333;
  }
  md-card span:last-child {
      float: right;
  }
  `]
  /*<div class="form-group">
      <tag-input [(ngModel)]='newStatus.tags' name="tags"
      type="hidden" 
      id="tags"
      [maxItems]="4"
      separatorKeys="[32]"
      ></tag-input>*/
})
export class UpdateCard implements OnInit {
 @Output() createStatus = new EventEmitter();
 @Input() status: any;
 lastDialogResult: string; 

  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog
    ) { }

  ngOnInit() {

  }


  openDialogStatus() {
      let dialogRef = this._dialog.open(DialogStatus);

      dialogRef.afterClosed().subscribe(result => {
        this.lastDialogResult = result;
      })
    }


  openDialog() {
    let dialogRef = this._dialog.open(DialogAsk);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }

  
}



@Component({
  //(click)="toggleStatus()" *ngIf="statusShow"
  selector: 'app-statuscard',
  template: `
  <div  class="updatestatus">
   <div *ngIf="isAuthorized" class="auth-010">
    <span><img md-card-avatar src="{{user.auth.photoURL}}"></span>
    <span class="span">{{ user.auth.displayName | shorten: 8: ' ' }} <i class="fa fa-caret-right" aria-hidden="true"></i></span>
    <span class="span"><strong>Public</strong></span>
   </div>
   <div class="close"> <button  md-button color="primary" (click)="close()">X</button></div>
   <md-card  [ngStyle]="{'background-color': newStatus.color}">
    <div *ngIf="progressCircular" class="wait">
        <md-progress-spinner mode="indeterminate" color="primary"></md-progress-spinner>
        <div class="alert alert-success"> Update successfully Posted </div>
        <div id="countdown"></div>
    </div>
   <form [class.blur]="progressCircular" *ngIf="isAuthorized" (ngSubmit)="onCreateStatus()">
    <div *ngIf="errorStatus" class="alert alert-danger" role="alert">
       <strong>Error: </strong>Status Should be between 5 - 100 Characters!
     </div>
    <div class="form-group">
      <textarea class="form-control" aria-label="Update Status"
      [(ngModel)]="newStatus.status"
      name="status"
      placeholder="What's new with you?"
      ></textarea>
     
       <app-colorcard class="pull-left"
              (selected)="onColorSelect($event)"
              [colors]="colors"
            >
     </app-colorcard>
      <button md-raised-button color="primary" type="submit"  class="pull-right">post status</button>
    </div>
     <div class="clearfix"></div>
  </form>
  <div *ngIf="!isAuthorized" class="not-auth color-primary" routerLink="/authentication">Click Here Log In to Post! It's easy and fast.</div>
  </md-card>
  </div>

  `,
   styleUrls: ['./creators.css']
  /*<div class="form-group">
      <tag-input [(ngModel)]='newStatus.tags' name="tags"
      type="hidden" 
      id="tags"
      [maxItems]="4"
      separatorKeys="[32]"
      ></tag-input>*/
})
export class StatusCard implements OnInit {
 @Output() createStatus = new EventEmitter();
 @Input() status: any;
 lastDialogResult: string; 
 isAuthorized: boolean = false;
 addedSuccess:boolean = false;
 errorStatus: boolean = false;
 progressCircular: boolean = false;
 user;
 tags;
 statusShow: boolean = false;
 colors: Array<string> = ['#737EA8','#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', '#fff', '#000'];
 newStatus = {
    status: '',
    color: '#fff',
    tags: this.tags
  };
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog,
    private statusService: StatusService
    ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => {
      this.user = value; 
    if(value){this.isAuthorized = true;} 
     else {this.isAuthorized = false} });

       this._GeolocationService.getCurrentIpLocation().subscribe( value => {
         this.tags = [value.city, value.country, 'status updates'];
          this.newStatus = {
            status: '',
            color: '#fff',
            tags: this.tags
          };
       });
  }
  
  toggleStatus() {
     this.statusShow = true;
  }
  onColorSelect(color: string) {
    this.newStatus.color = color;
  }

  onCreateStatus() {
    let type = "Status Update";
    const { status, color, tags} = this.newStatus;
    if(!status){
      this.errorStatus = true;
    }
    if (status) {
      this.errorStatus = false;
      this.statusService.createStatus( status, color, tags, type);
      this.addedSuccess = true;
       var i = 5;
       var myinterval = setInterval(() => {
       this.progressCircular = true;
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
    this.newStatus = {
      status: '',
      color: '#fff',
      tags: ''
    };
  }

   close() {
      this._dialog.closeAll();
  }

}

@Component({
  template: `
    <app-statuscard class="animated bounceInUp"></app-statuscard>
  `,
})
export class DialogStatus {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogStatus>) { }
}



@Component({
  template: `
    <app-questioncard></app-questioncard>
  `,
})
export class DialogAsk {
  constructor(@Optional() public dialogRef: MdDialogRef<DialogAsk>) { }
}



