import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { StatusService } from '../../../shared/services/status/status.service';
import { PageService } from '../../../shared/services/page/page.service';
import { Title } from '@angular/platform-browser';
import {MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
id: string;
USER: any;
isAuthorized: boolean;
isAuth: boolean;
users: any;
statuses= [];
drafts: any;
draftscount: number;
user_updates: boolean = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private titleService: Title,
    private _StatusService: StatusService,
    private _pageService: PageService,
    public snackBar: MdSnackBar
  ) { }

  ngOnInit() {

  
   
  /*this.router.events.subscribe((url)=>{ this.route.params.subscribe(params => {
    this.titleService.setTitle(`${params['string'].replace(/ /g,".")} account profile`)
    });
  });*/
   
   this.route.params.subscribe(params => {
        this.id = params['id'];
        let str = params['string'];
        this._authService.userById(this.id)
        .subscribe(user => {this.USER = user;});
    this._authService.userAuth
    .subscribe(value => { 
    if(value){
        this._authService.checkThisLoginUserIs(this.id).subscribe(value => {if(value){ this.isAuth = true}});
    }});

    this._StatusService.getStatus()
        .subscribe(statuses => {  
           this.statuses = statuses.filter(function(a) {
              return a.uid === params['id'];
           });
       
        if(this.statuses.length === 0)
           {
             this.user_updates = false;
           }
    });


    this._pageService.getDrafts(this.id).subscribe(drafts => {this.drafts = drafts;
       this.drafts = drafts.filter(function(a){
         return a.status === "draft";
     });
     this.draftscount = this.drafts.length;
    });
    

    
  });
  
  
}

delDraft(e){
  this._pageService.delDraft(e);
}
onStatusChecked(status) {
    this._StatusService.rateStatus(status);
  }
}
