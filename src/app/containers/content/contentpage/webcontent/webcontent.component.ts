import { Component,  OnInit, Input, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../shared/services/page/page.service';
import { StatusService } from '../../../../shared/services/status/status.service';
import { MetaService } from 'ng2-meta/src';
import {DomSanitizer} from "@angular/platform-browser";
@Component({
  selector: 'app-webcontent',
  templateUrl: './webcontent.component.html',
  styleUrls: ['./webcontent.component.css']
})
export class WebcontentComponent implements OnInit, OnDestroy{
wid: string;
webpage: any;promowebpages = [];
auth: any;
webcontentOk: boolean = false;
webauthOk: boolean = false;
isAuthorized: boolean = false;
user;webpageslike;
comments: any;
webpageBlg: any;
isBlog: boolean = false;
sub: any;srcUrl;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService,
    private domSanitizer : DomSanitizer
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['wid']){
         this.wid = params['wid'];
      }
        this._pageService.getPage(this.wid).subscribe(page =>  {this.webpage = page;});
        this._pageService.getWebPage(this.wid).subscribe(pageBlg =>  {this.webpageBlg = pageBlg; 
          this.metaService.setTitle(this.webpageBlg.blogTitle.replace(/<(?:.|\n)*?>/gm, ''));
          if(this.webpageBlg){
            this.webcontentOk = true;  
          } else {
             this.router.navigate(['/notfound404']);
          }
        this._authService.userById(this.webpageBlg.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.webauthOk = true;
          }
         
          this.metaService.setTag('author', this.auth.name);
          this.metaService.setTag('description', this.webpageBlg.blogDesc.replace(/<(?:.|\n)*?>/gm, ''));
          this.metaService.setTag('keywords', this.webpageBlg.blogDesc.trim().replace(/\s+/g, ", ").replace(/<(?:.|\n)*?>/gm, ''));
          this.metaService.setTag('og:image',this.webpageBlg.photoUrl);
          this.metaService.setTag('twitter:image',this.webpageBlg.photoUrl);
      
      this.srcUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(pageBlg.videoUrl); 
   });

     
      // this._statusService.getComments(this.wid).subscribe(comments => this.comments = comments); 

    this._pageService.getwebBlogs()
    .subscribe(webpages => {  
        this.promowebpages = webpages.filter(function(a){
            return a.status == "Published";
        });
        this.promowebpages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });

        this.webpageslike = this.promowebpages.filter(function(a){
            return a.blogCat === pageBlg.blogCat && a.pid !== pageBlg.pid;
        });
    });
  
  });
 });

  this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value; } 
     else {this.isAuthorized = false} });
}

showLove(status) {
    this._statusService.rateStatus(status);
  }
  
savePost(){
  console.log(this.wid);
  
}


ngOnDestroy(){
  this.sub.unsubscribe();
}
}
