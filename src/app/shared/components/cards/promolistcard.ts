import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-promocardlist',
  template: `
  <div class="mar-10">
   <md-card class="animated shake shadow-2" routerLink="/content/_blog/{{promo.blogCat | slugify}}/{{ promo.pid }}/{{promo.blogTitle | slugify | shorten: 50}}">
   <img md-card-image src="{{promo.photoUrl}}">
   <md-card-content>
      <p>{{promo.blogTitle}}</p>
     
   </md-card-content>
    <md-card-actions>
   <button md-button class="pull-left"><i class="fa fa-clock-o" aria-hidden="true"></i> {{promo.createdAt | amTimeAgo:true}} ago!</button>
    <button md-button class="pull-right"><i class="fa fa-external-link-square" aria-hidden="true"></i> Read</button>
    <div class="clearfix"></div>
   </md-card-actions>
  </md-card>
  <div class="mar-10"></div>
  `,
  styles: [`
  md-card {
      cursor: pointer;
      word-break: break-all;
  }
  .card-links i{
    margin-right: 5px;
  }
  .list-group-item {
    border: none !important;
    padding: 0.5rem 0.5rem !important;
    }
    md-card-header {
    display: flex;
    flex-direction: row;
    height: 40px;
    margin: -8px 0 0px !important;
   }
   md-card, .list-group, .list-group-item {
    
   }
  `]
})
export class PromoCardList implements OnInit {
 @Input() promo = {};
 isAuthorized: boolean = false;
 user; 
 pages = [];
 statusesOk: boolean = false;
  constructor(
      private _authService: AuthService
  ) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });

    
  }

}


@Component({
  selector: 'app-promoListLike',
  template:`
  <div class="container-fluid list-like">
  <div class="row">
     <div class="col-md-3">
       <img class="blog-avatar" src="{{pagelike.photoUrl}}" alt="{{pagelike.blogTitle}}">
     </div>
     <div class="col-md-9">
       <small> <i class="fa fa-clock-o" aria-hidden="true"></i> {{pagelike.createdAt | amTimeAgo:true}} ago!</small>
       <h1><a *ngIf="pagelike.contenttag" routerLink="/webcontent/{{pagelike.blogCat | slugify}}/{{ pagelike.pid }}/{{pagelike.blogTitle | slugify}}">{{pagelike.blogTitle}}</a>
       <a *ngIf="!pagelike.contenttag" routerLink="/content/_blog/{{pagelike.blogCat | slugify}}/{{ pagelike.pid }}/{{pagelike.blogTitle | slugify}}">{{pagelike.blogTitle}}</a>
       </h1>
       <p>{{pagelike.blogDesc}}</p>
     </div>
     <div class="clearfix"></div>
     <md-divider color="primary"></md-divider>
  </div>  
   </div>
  `,
  styles: [`
   .list-like img.blog-avatar{
     width:100%;
     height: 100px;
   }
   .list-like h1 {
     margin: 10px 0;
     font-size: 1.8em;
   }
 
  .list-like {
    margin: 20px 0 !important;
    border-bottom: 1px solid #ccd;
    padding: 10px 0px;
    }
   
   @media screen and (max-width: 769px){
      .list-like .row {

        margin-right: 0px !important;
        margin-left: 0px !important; 
    }
   }
  
    .list-like small {
      color: rgba(0, 0, 0, 0.91) !important;
    }
   
   md-divider {
    display: block;	
    border-top: 1px solid;		
    border-top-style: solid;
    border-top-width: 1px;
    margin: 0;
    border-color: #e6e4e4;
  }	
   
  `]
})
export class AdslistlikeCard implements OnInit {
 @Input() pagelike= {};
  constructor() { }

  ngOnInit() {
  }

}

