import { Component, OnInit, Input, Output, EventEmitter, Optional, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { StatusService } from '../../services/status/status.service';
import { VgAPI } from 'videogular2/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-homecard',
  template: `
   <div *ngIf="status && !hideStatus" [class.animated]="isHide" [class.fadeOutUp]="isHide" class=" card-item animated shake shadow-1-main " >
     <md-card  [ngStyle]="{'background-color': status.color}" [class.changeContentColor]="isBgNotWhite">
      <md-card-header>
          <img md-card-avatar src="{{status.avatar}}">
          <md-card-title><a routerLink="/user/{{ status.uid }}/{{status.username | slugify}}">{{status.username | shorten: 8: '.'}}</a>  {{status.createdAt | amTimeAgo:true}} ago!</md-card-title>
          <span class="pull-right-set"><button md-button [md-menu-trigger-for]="menu">
        <i class="fa fa fa-ellipsis-v fa-1x" aria-hidden="true"></i>
         
         </button></span>
         <md-menu #menu="mdMenu">
          <button md-menu-item (click)="hide(false)">Hide</button>
         
          <button *ngIf="isAuthorized && user.uid === status.uid" md-menu-item (click)="delete(status.sid)">Delete</button>
        </md-menu>
          <md-card-subtitle class="type-0">
          {{status.type}}
          </md-card-subtitle> 
      </md-card-header>
       <h1  *ngIf='status.contenttag !== "Status Update" && status.contenttag !== "Question"'>{{status.statustitle}}</h1> 
        <img *ngIf="status.photoUrl"  md-card-image  src="{{status.photoUrl}}">
    
      <div  *ngIf='status.type === "Audio"' class="music-010">
        <md-card-content>
        
                <vg-player (onPlayerReady)="onPlayerReady($event)"  >
                    <vg-controls>
                        <vg-play-pause></vg-play-pause>
                        <vg-playback-button></vg-playback-button>

                        <vg-time-display vgProperty="current" vgFormat="mm:ss"></vg-time-display>

                        <vg-scrub-bar>
                            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>
                            <vg-scrub-bar-buffering-time></vg-scrub-bar-buffering-time>
                        </vg-scrub-bar>

                        <vg-time-display vgProperty="total" vgFormat="mm:ss"></vg-time-display>

                        <vg-mute></vg-mute>

                    </vg-controls>

                    <audio vgMedia id="myAudio" preload="auto">
                        <source *ngFor="let audio of sources" [src]="audio.src" [type]="audio.tags">
                    </audio>
             </vg-player>  
        <h1>{{status.status}}</h1>
       
         
  
       </md-card-content>
        <md-card-actions>
        <div class="divider"></div>
        <div class="pull-left">
                     <button md-button  (click)="onClickPlay($event)">
                        <i *ngIf="!playing" class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>
                           <i *ngIf="playing" class="fa fa-pause-circle-o fa-2x" aria-hidden="true"></i> Listen now
                   </button>           
          </div> 
        <div  class="pull-right">
         <button md-button color="primary" (click)="showLove()"><i class="fa fa fa-heart fa-2x" aria-hidden="true"></i></button> {{status.rating + 1}}
        <button md-button routerLink="/music/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify}}" class="nsm-01btn"><span class="no-big"><i class="fa fa-external-link fa-2x" aria-hidden="true"></i></span><span class="no-sm-no">music</span></button>
        <button md-button (click)="openDialog()"><i class="fa fa-share-alt-square fa-2x" aria-hidden="true"></i></button>
      
        <button md-button data-toggle="collapse" [attr.data-target]="'#' + status.sid" aria-expanded="false" aria-controls="collapseExample"><i class="fa fa-commenting fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="clearfix"></div>                
                      <div *ngIf="playing" class="animations-player">
                      <div *ngFor="let item of createRange(41)">
                            <div *ngIf="item>0" [ngClass]="getColorForBlock(item)" class="block" id="block{{item}}">{{item}}</div>
                      </div>    
                  </div>
          </md-card-actions>
       </div>



     <div  *ngIf='status.type !== "Audio"'>
      <md-card-content>
      <h1  *ngIf='status.contenttag === "Status Update" || status.contenttag === "Question"' class="title">
       <div [outerHTML]="status.status | linky"></div>
      </h1>
      <div *ngIf='status.contenttag !== "Status Update" && status.contenttag !== "Question"' [outerHTML]="status.status | linky"></div>
      </md-card-content>
      
       <md-card-actions class="container-fluid">
        <div class="divider"></div>  
       <div class="pull-left">
        <button md-button color="primary" (click)="showLove()"><i class="fa fa fa-heart fa-2x" aria-hidden="true"></i></button> {{status.rating + 1}} 
        <button md-button (click)="openDialog()"><i class="fa fa-share-alt-square fa-2x" aria-hidden="true"></i></button>
        </div>
        <div  class="pull-right">
        <button md-button *ngIf="status.contenttag === 'Question'" routerLink="/content/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify | shorten: 50}}" class="nsm-01btn"><span class="no-big nsm-01btn"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></span><span class="no-sm-no">Help Answer</span></button>
        <button md-button *ngIf="status.contenttag === 'Status Update'" routerLink="/content/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify | shorten: 50}}" class="nsm-01btn"><span class="no-big"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></span><span class="no-sm-no">More..</span></button>
        
        <button md-button *ngIf='status.contenttag === "Webcontent"' routerLink="/webcontent/{{status.type | slugify}}/{{ status.sid }}/{{status.statustitle | slugify}}" class="nsm-01btn"><span class="no-big"><i class="fa fa-eye fa-2x" aria-hidden="true"></i></span><span class="no-sm-no">More..</span></button>

        <button md-button *ngIf='status.contenttag !== "Status Update" && status.contenttag !== "Question" && status.contenttag !== "Webcontent"' routerLink="/content/blog/{{status.type | slugify}}/{{ status.sid }}/{{status.statustitle | slugify }}" class="nsm-01btn"><span class="no-big "><i class="fa fa-eye fa-2x" aria-hidden="true"></i></span><span class="no-sm-no">More..</span></button>

         

      
        <button md-button data-toggle="collapse" [attr.data-target]="'#' + status.sid" aria-expanded="false" aria-controls="collapseExample"><i class="fa fa-commenting fa-2x" aria-hidden="true"></i></button>
        </div>
        <div class="clearfix"></div>
      </md-card-actions>
      </div>

      <div class="collapse container-fluid" [attr.id]="status.sid">
        <app-commentcard [status]="status">
        </app-commentcard>
        
        <div class="comments">
        <app-commentscard [status]="status" [limit]="3">
        </app-commentscard>
          <div class="more-c" *ngIf='status.contenttag === "Status Update" || status.contenttag === "Question"'><a  routerLink="/content/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify | shorten: 50}}"> Load more comments</a></div>
           <div class="more-c" *ngIf='status.contenttag === "Webcontent"'><a  routerLink="/webcontent/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify | shorten: 50}}"> Load more comments</a></div>
          <div class="more-c" *ngIf='status.contenttag !== "Status Update" && status.contenttag !== "Question" && status.contenttag !== "Webcontent"'><a  routerLink="/content/blog/{{status.type | slugify}}/{{ status.sid }}/{{status.status | slugify | shorten: 50}}"> Load more comments</a></div> 
      </div>  
        </div>

    </md-card>
   </div>
  
  `,
  styleUrls: ['./cards.css'],
 changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCard implements OnInit {
   /*<button md-menu-item (click)="save()">Save Post</button>*/
@Input() status: any;
@Output() checked = new EventEmitter();
@Output() limit = 1;
isHide: boolean = false;
hideStatus: boolean = false;
comment;
 isAuthorized: boolean = false;
 user;
playing: boolean = false;
isBgNotWhite: boolean = false;
sources:Array<Object>;

api: VgAPI;
  constructor(
    private _authService: AuthService,
    private _dialog: MdDialog,
    private _statusService: StatusService
    ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
     //for player
    if(this.status.type === "Audio"){
      this.sources = [
          this.status
     ];
    }

    if(this.status.color !== '#fff'){
      this.isBgNotWhite = true;
    }
  
  }
  showLove(){
    this.checked.next(this.status);
  }
  
  hide(value: boolean){
    this.isHide = true;
    var i = 1;
       var myinterval = setInterval(() => {
        if (i === 0) {
            clearInterval(myinterval );
            this.hideStatus = true;
        }
        else {
            i--;
        }
     }, 500);
  }
  
  delete(sid){
    this._statusService.sDelete(sid);
    this.hide(false);
   
  }

openDialog() {
     let dialogRef = this._dialog.open(DialogShare);
     dialogRef.componentInstance.status = this.status;
  }

  //music player
   onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api = api;
		 this.api.getDefaultMedia().subscriptions.ended.subscribe(
				() => {
				  this.playing = false;
				}
		);

  }
  onClickPlay(e){
     
      if(!this.playing){
          this.api.play();
          this.playing = true;  
      } else if(this.playing){
          this.playing = false;
          this.api.pause();
      } 
      
  }
    createRange(len=41) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }

  getColorForBlock(index) {
  if (index % 40 < 6) {
    return "pink";
  } else if (index % 40 < 10) {
    return "yellow";
  } else if (index % 40 < 15) {
    return "cyan";
  } else if (index % 40 < 20) {
    return "orange";
  } else if (index % 40 < 25) {
    return "red";
  }else if (index % 40 < 30) {
    return "blue";
  }else if (index % 40 < 35) {
    return "yellow";
  } else {
    return "pink";
  }
}
// End for player
}

@Component({
  template: `
    <app-sharecard [status]="status"></app-sharecard>
  `,
})
export class DialogShare {
  status: any;
  constructor(@Optional() public dialogRef: MdDialogRef<DialogShare>) { }
}


@Component({
  selector: 'app-asidecard',
  template: `
   <nav class="nav flex-column">
    <a class="nav-link" routerLink=""><i class="fa fa-home fa-1x color-primary" aria-hidden="true"></i> <span class="only-hd">Home</span></a>
    <a class="nav-link" routerLink="/jobs"><i class="fa fa-briefcase fa-1x color-green" aria-hidden="true"></i> <span class="only-hd">Find a Jobs</span></a>
    <a class="nav-link" routerLink="/music"><i class="fa fa-headphones fa-1x color-red" aria-hidden="true"></i> <span class="only-hd">Music</span></a>
    <a class="nav-link" routerLink="/stories"><i class="fa fa-rss fa-1x color-pink" aria-hidden="true"></i> <span class="only-hd">Stories</span></a>
    <a class="nav-link" routerLink="/places"><i class="fa fa-location-arrow fa-1x color-skyblue" aria-hidden="true"></i> <span class="only-hd">Africa Places</span></a>
    <a class="nav-link" routerLink="/questions"><i class="fa fa-question-circle fa-1x color-red" aria-hidden="true"></i> <span class="only-hd">Answer a Questions</span></a>
    </nav> 
  `,
  styles: [`
    nav a {
        font-size: 1.2em;
        color: #666;
        transition: background-color .3s cubic-bezier(0,0,0.2,1);
        line-height: 40px;
    }
  
  `]
})
export class AsideCard implements OnInit {
 isAuthorized: boolean = false;
 user;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => {
       this.user = value; 
    if(value){this.isAuthorized = true;} 
     else {this.isAuthorized = false} });
  }

}
