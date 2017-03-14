import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StatusService } from '../../services/status/status.service';
import { GeolocationService } from '../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import {SlugifyPipe} from 'ngx-pipes/src/app/pipes/string/slugify';
@Component({
  selector: 'app-sharecard',
  template: `
  <div  class="updatestatus">
  <div class="auth-010">
    <span class="span"><strong><i class="fa fa-share-alt-square fa-1x" aria-hidden="true"></i> Share On Social</strong></span>
   </div>
  <div class="close"> <button  md-button (click)="close()">X</button></div>
   <md-card>
  <app-socialshare [status]="status" [title]="status.status | shorten: 78"></app-socialshare>
  </md-card>
  </div>
  `,
  styleUrls: ['./creators.css'],
  providers: [SlugifyPipe]
 
})
export class ShareCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;

 statusUrl;statusDesc;statusPhotoUrl;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    private slugifyPipe: SlugifyPipe
    ) { }

  ngOnInit() {
     this.statusUrl =  `${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}/`;
     if(this.status.type == "Status Update")
     {
       this.statusPhotoUrl = "https://weytindey.com/assets/img/_status.png";
     } else if (this.status.type == "Question"){
        this.statusPhotoUrl =  "https://weytindey.com/assets/img/_status_q.png";
     } else {
       this.statusPhotoUrl =  this.status.photoUrl;
     }
     this.statusDesc = encodeURIComponent(this.status.status.trim())
  }

   close() {
      this._dialog.closeAll();
  }

}

@Component({

  selector: 'app-socialshare',
  template: `
  <div class="row sharecard" style="text-align:center; margin:15px 0;">
   <div class="col-4" style="text-align:center;">
     <a class="btn btn-social btn-facebook" href="https://www.facebook.com/dialog/feed?app_id=1732300390419025
                &redirect_uri={{statusUrl}}
                &link={{statusUrl}}
                &name={{isTitle}}
                &caption=www.weytindey.com | {{status.type}}
                &picture={{statusPhotoUrl}}
                &description={{statusDesc}}.
                &properties={text:’value1′,key2:’value2′}
                &actions={name:’I LOVE Africa’,link:’https://www.weytindey.com’}&&
  display=popup">
                 <span class="fa fa-facebook-square">
       </span> <span class="no-big">FB</span> <span class="no-sm-no">Share On Facebook</span></a>
    </div>
    <div class="col-4" style="text-align:center;">
        <a class="btn btn-social btn-twitter"
        href="https://twitter.com/share?text={{isTitle}}&url={{statusUrl}}&hashtags=afroweb,weytindey,africanoneweb">
        <span class="fa fa-twitter-square">
       </span> <span class="no-big">TW</span> <span class="no-sm-no">Share On Twitter</span>
        </a>
    </div>
    <div class="col-4" style="text-align:center;">
        <a class="btn btn-social btn-google"
        href="https://plus.google.com/share?url={{statusUrl}}&text={{statusDesc}}&redirecturi={{statusUrl}}&image=https://weytindey.com/assets/img/_status.png&label=READ">
        <span class="fa fa-google-plus-square">
       </span> <span class="no-big">G+</span> <span class="no-sm-no">Share On Google</span>
        </a>
    </div>
 </div>
  `,
  styleUrls: ['./creators.css'],
  providers: [SlugifyPipe]
 
})
export class SocialCard implements OnInit {
 @Output() createshare = new EventEmitter();
 @Input() status: any;
 @Input() title: any;
 isTitle;
 statusUrl;statusDesc;statusPhotoUrl;
  constructor(
    private _dialog: MdDialog,
    private statusService: StatusService,
    private slugifyPipe: SlugifyPipe
    ) { }

  ngOnInit() {
     
     if(this.status.contenttag == "Status Update")
     {
       this.statusPhotoUrl = "https://weytindey.com/assets/img/_status.png";
       this.statusUrl =  `https://weytindey.com/content/${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}`;
       this.isTitle = "Status Update";
       this.statusDesc = encodeURIComponent(this.status.status.trim().replace(/<(?:.|\n)*?>/gm, ''));
     } else if (this.status.contenttag == "Question"){
        this.statusPhotoUrl =  "https://weytindey.com/assets/img/_status_q.png";
        this.statusUrl =  `https://weytindey.com/content/${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}`;
        this.isTitle = this.status.status;
        this.statusDesc = "Help Answer this question and more!.. Life's most persistent and urgent question is, 'What are you doing for others?' Martin Luther King, Jr";
     } else if (this.status.contenttag == "Audio"){
        this.statusPhotoUrl =  "https://weytindey.com/assets/img/audio.png";
        this.statusUrl =  `https://weytindey.com/music/${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.status.status)}`;
        this.isTitle = "Listen and Download Free" + ':' + ' '+ this.status.status;
        this.statusDesc = "Start sharing your own music online today. Create and share your playlist! \n 10K+ listening now.";
     } else if (this.status.contenttag == "Webcontent"){
        this.statusPhotoUrl =  encodeURIComponent(this.status.photoUrl);
        this.statusUrl =  `https://weytindey.com/webcontent/${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.title)}`;
        this.isTitle = this.title.replace(/<(?:.|\n)*?>/gm, '');
        this.statusDesc = encodeURIComponent(this.status.status.trim().replace(/<(?:.|\n)*?>/gm, ''));
     } else {
       this.statusPhotoUrl =  encodeURIComponent(this.status.photoUrl);
        this.statusUrl =  `https://weytindey.com/content/_blog/${this.slugifyPipe.transform(this.status.type)}/${this.slugifyPipe.transform(this.status.sid)}/${this.slugifyPipe.transform(this.title)}`;
      this.isTitle = this.title.replace(/<(?:.|\n)*?>/gm, '');
      this.statusDesc = encodeURIComponent(this.status.status.trim().replace(/<(?:.|\n)*?>/gm, ''));
     }

  
     
  }
}


