import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../shared/services/page/page.service';
import { StatusService } from '../../../../shared/services/status/status.service';
import { MetaService } from 'ng2-meta/src';
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit, OnDestroy {

pid: string;
page: any;promopages = [];
auth: any;
pageOk: boolean = false;
authOk: boolean = false;
isAuthorized: boolean = false;
user; sub;
comments: any;
pageBlg: any;
isBlog: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _pageService: PageService,
    private _statusService: StatusService,
    private metaService: MetaService
    ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if(params['pid']){
        this.pid = params['pid'];
      } 
        this._pageService.getPage(this.pid).subscribe(page =>  {this.page = page; 
            this.metaService.setTitle(this.page.status.replace(/<(?:.|\n)*?>/gm, ''));
            
           
          if(this.page){
            this.pageOk = true;
          }
        this._authService.userById(this.page.uid).subscribe(auth => {this.auth = auth;
           if(this.auth){
            this.authOk = true;
          }
          this.metaService.setTag('author', this.auth.name);
          if(this.page.type !== "Status Update"){
             this.metaService.setTag('author', "Update");
          }
          if(this.page.type !== "Question"){
             this.metaService.setTag('author', "Help Answer");
          }

          this.metaService.setTag('og:title', this.page.status.replace(/<(?:.|\n)*?>/gm, ''));
          this.metaService.setTag('description', this.page.status.replace(/<(?:.|\n)*?>/gm, ''));
          this.metaService.setTag('keywords', this.page.status.trim().replace(/\s+/g, ", ").replace(/<(?:.|\n)*?>/gm, ''));
        });

      });
       this._statusService.getComments(this.pid).subscribe(comments => this.comments = comments); 
    });

    this._pageService.getBlogs()
    .subscribe(pages => {
        
        this.promopages = pages.filter(function(a){
            return a.status !== "draft";
        });
        this.promopages.sort(function(a, b) {
            return b.createdAt - a.createdAt;
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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
