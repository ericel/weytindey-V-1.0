import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../../../shared/services/media/media.service'
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../shared/services/page/page.service';
import { StatusService } from '../../../../shared/services/status/status.service';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from 'ng2-meta/src';
import * as firebase from 'firebase';
import { Headers, Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
@Component({
  selector: 'app-musicfile',
  templateUrl: './musicfile.component.html',
  styleUrls: ['./musicfile.component.css']
})
export class MusicfileComponent implements OnInit {
playing: boolean = false;
sources:Array<Object>;
sourcesLike:Array<Object>;
id; auth; page; pageOk: boolean = false;
storageRef; file_url;
handleError;
  constructor(
    private _mediaService: MediaService,
    private _authService: AuthService,
    private route: ActivatedRoute,
    private _pageService: PageService,
    private _metaService: MetaService,
    private _statusService: StatusService,
    private http: Http
  ) { 

  }

  ngOnInit() {
   this.route.params.subscribe(params => {
     this.id = params['mid'];
     this._pageService.getPage(this.id).subscribe(page =>  {this.page = page;
      if(this.page){
            this.pageOk = true;  
     } 
     });
     this._mediaService.getAudio(this.id).first().subscribe(sources => {
        
        this._metaService.setTitle("Download and Listen to" + " " + sources.filename.replace(/<(?:.|\n)*?>/gm, '') + " " + "free");
        this._metaService.setTag('og:image', "https://weytindey.com/assets/img/audio.png");
        this._metaService.setTag('description', "Get the best of African Music online! "+sources.filename.replace(/<(?:.|\n)*?>/gm, '')+" is a "+sources.country+" hit song.");
        this._metaService.setTag('date', ""+sources.createdAt+"");
        this._metaService.setTag('robots', "index,follow");
        this._authService.userById(sources.uid).subscribe(auth => {this.auth = auth; 
        this.sources = [
          {
            mid: sources.mid,
            avatar: auth.avatar,
            uid: sources.uid,
            filename: sources.filename,
            name: auth.name,
            username: auth.username,
            createdAt: sources.createdAt,
            src: sources.src,
            type: sources.type,
            country: sources.country
          }
        ]
        });
     });
   });

   this.moreofArtist();

    this.storageRef = firebase.storage().ref().child(`eAudio/${ this.id}`);
    this.storageRef.getDownloadURL().then(url => {
    this.file_url = url;
   });
  }

moreofArtist(){
  this._mediaService.getAudios().first().subscribe(sources => { this.sourcesLike = sources;

       /* this.sourcesLike.sort(function(a, b) {
            return b[0].createdAt - a[0].createdAt;
        });*/
});
}
 showLove(status) {
    this._statusService.rateStatus(status);
}

createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
downloadFile() {
    let downloadUrl = "https://firebasestorage.googleapis.com/v0/b/enoeasy-94b34.appspot.com/o/Davido%20-%20If.mp3?alt=media&token=603f3beb-2380-42a4-a119-7bbb34769d78"
    let headers = new Headers({ 'Content-Type': 'audio/mpeg', 'MyApp-Application' : 'AppName', 'Accept': 'audio/*' });
    let options = new RequestOptions({ headers: headers, responseType: ResponseContentType.Blob });

    return this.http.post(downloadUrl, '', options)
        .map(this.extractContent)
        .catch(this.handleError);
    }

private extractContent(res: Response) {
        let blob: Blob = res.blob();
        window['saveAs'](blob, 'test.mp3');
}
download(){
    this.storageRef = firebase.storage().ref().child(`eAudio/${ this.id}`);
    this.storageRef.getDownloadURL().then(url => {
    const file_url = url;
    this.file_url = url;
    var el = document.createElement('a');
    el.download = "Eric.mp3";
    el.href = file_url;
    //document.body.appendChild(el);
    el.click();
    //el.remove();
   });
  }
}
