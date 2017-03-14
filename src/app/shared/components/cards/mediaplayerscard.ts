import { 
  Component,
   OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { VgAPI } from 'videogular2/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-audiofilecard',
  template: `
   <md-card class="music-01" *ngIf="audio">
        <md-card-header>
            <img md-card-avatar src="{{audio.avatar}}" alt="{{audio.name}}">
              <md-card-title>uploaded by <a routerLink="/user/{{ audio.uid }}/{{audio.username | slugify}}">{{audio.username | shorten: 8: '.'}}</a>  {{audio.createdAt | amTimeAgo:true}} ago!</md-card-title>
               <md-card-subtitle>{{audio.country}}</md-card-subtitle>
                  <span class="pull-right-set"><button md-button [md-menu-trigger-for]="menu">
                    <i class="fa fa fa-ellipsis-v fa-1x" aria-hidden="true"></i>
                    </button></span>
                    <md-menu #menu="mdMenu">
                    <button md-menu-item (click)="hide(false)">Hide</button>
                    <button md-menu-item (click)="save()">Save Post</button>
                    <button  md-menu-item>Delete</button>
                    </md-menu>
                </md-card-header>
                     
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
                        <source *ngFor="let audio of sources" [src]="audio.src" [type]="audio.type">
                    </audio>
             </vg-player>
                <h1>{{audio.filename}}</h1>
              
               </md-card-content>
                <md-card-actions>
                          <div class="pull-left">
                          <button md-button  (click)="onClickPlay($event)">
                        <i *ngIf="!playing" class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i>
                           <i *ngIf="playing" class="fa fa-pause-circle-o fa-2x" aria-hidden="true"></i> Listen now
                          </button>
                         </div>
                         <a class="pull-rightm" routerLink="/music/audio/{{audio.mid}}/{{audio.filename | slugify}}">
                             music link
                         </a>
                      </md-card-actions>
                      <div *ngIf="playing" class="animations-player">
                      <div *ngFor="let item of createRange(41)">
                            <div *ngIf="item>0" [ngClass]="getColorForBlock(item)" class="block" id="block{{item}}">{{item}}</div>
                      </div>    
                      </div>
                    </md-card>
                  
       <div class="mar-15"></div>
          
  `,
  styleUrls: ['./cards.css']
})
export class AudiofileCard implements OnInit {
users: any;
audiosrc; audiotype;
playing: boolean = false;
sources:Array<Object>;
@Input() audio: Array<Object>;
api: VgAPI;
  constructor(private _authService: AuthService) { 
      
  }
 onPlayerReady(api:VgAPI) {
        this.api = api;
        this.api = api;
        
		 this.api.getDefaultMedia().subscriptions.ended.subscribe(
				() => {
				  this.playing = false;
				}
		);

  }
  ngOnInit() {
    
     this._authService._isUsers()
    .subscribe(value => { 
     this.users = value;
    });
  
    this.sources = [
          this.audio
    ];
  
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
}


