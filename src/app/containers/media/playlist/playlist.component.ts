import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/core';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs';
export interface IMediaStream {
    src:string;
    filename:string;
    type:string;
}
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
sources:Array<Object>;
api: VgAPI;
playing: boolean = false;
currentStream: string;
page = {
  color: "#fff",
 contenttag: "Audio",
 country: "Nigeria",
 createdAt: 1488258227271,
 rating: 0,
 sid: "0267ff940d7b795d4e06afbc1331beeb",
 src: "https://firebasestorage.googleapis.com/v0/b/eno...",
 status: "Flavour - Sexy Rosey ft. P-Square",
 tags: "audio/mp3",
 type: "Audio",
 uid: "mw1VKFbrAyOjy6u23zI2WXMzu5y2",
 updatedAt: 1488258227271

}
  constructor() { }
 onPlayerReady(api:VgAPI) {
        this.api = api;
        
		 this.api.getDefaultMedia().subscriptions.ended.subscribe(
				() => {
				  this.playing = false;
				}
		);

  }
   streams:IMediaStream[] = [
        {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            },
            {
                src: "https://firebasestorage.googleapis.com/v0/b/enoeasy-94b34.appspot.com/o/eAudio%2F30111fb145f30ea4fe1ea92502bcdd98?alt=media&token=d0dd0ef0-19f0-4c5b-8531-6181aeb0e460",
                type: "audio/mp3",
                filename: "Eric Clapton"
            },
            {
                src: "https://firebasestorage.googleapis.com/v0/b/enoeasy-94b34.appspot.com/o/eAudio%2F30111fb145f30ea4fe1ea92502bcdd98?alt=media&token=d0dd0ef0-19f0-4c5b-8531-6181aeb0e460",
                type: "audio/mp3",
                filename: "Eric Clapton"
            },
             {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            },
            {
                src: "https://firebasestorage.googleapis.com/v0/b/enoeasy-94b34.appspot.com/o/eAudio%2F30111fb145f30ea4fe1ea92502bcdd98?alt=media&token=d0dd0ef0-19f0-4c5b-8531-6181aeb0e460",
                type: "audio/mp3",
                filename: "Eric Clapton"
            },
             {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            },
             {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            },
             {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            },
             {
                src: "http://static.videogular.com/assets/audios/videogular.mp3",
                type: "audio/mp3",
                filename: "Sma watson"
            }
    ];
  ngOnInit() {
        this.currentStream = this.streams[0].src;
        console.log(this.currentStream);
  }
  onClickStream(stream:IMediaStream) {
        this.api.pause();

        let timer:Subscription = TimerObservable.create(0, 10).subscribe(
            () => {
                this.currentStream = stream.src;
                timer.unsubscribe();
            }
        );
    }

}
