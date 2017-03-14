import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-promocard',
  template: `
  <div class="mar-10"></div>
   <md-card class="animated shake">
   <img md-card-image src="/assets/img/card.jpg">
   <md-card-content>
      <p>Here is some more content</p>
   </md-card-content>
  </md-card>
  <div class="mar-10"></div>
  <md-card>
     <img md-card-image src="/assets/img/card.jpg">
     <md-card-content>
        <p>Here is some more content</p>
     </md-card-content>
  </md-card>
  <div class="mar-10"></div>
  <md-card>
     <img md-card-image src="/assets/img/card.jpg">
     <md-card-content>
        <p>Here is some more content</p>
     </md-card-content>
  </md-card>
  <div class="mar-10"></div>
  `,
  styles: [`
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
export class PromoCard implements OnInit {
 isAuthorized: boolean = false;
 user;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }

}
