import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../shared/services/media/media.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { PageService } from '../../../shared/services/page/page.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
playing: boolean = false;
sources:Array<Object>;

  constructor(
      private _mediaService: MediaService,
      private _authService: AuthService
  ) { 
    

  }

  ngOnInit() {
      this._mediaService.getAudios().first().subscribe(sources => { this.sources = sources;});
  }
  
  onAudioPlay(music){
     //console.log(music)
  }
 
 
  createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }

  sortCountry(country){
    this._mediaService.getAudios().first().subscribe(sources => { 
       this.sources =  sources.filter(function(a){
          return a.country === country;
       });
    });
  }


}

