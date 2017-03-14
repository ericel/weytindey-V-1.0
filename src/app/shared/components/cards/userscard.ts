import { 
  Component,
   OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-userscard',
  template: `
 <div class="container-fluid users-box">
  <md-card>
  <masonry [useImagesLoaded]="true">
   <masonry-brick class="col-md-3" *ngFor="let user of users let i=index"> 
    <div *ngIf="i<limit">
    <figure routerLink="/user/{{ user.uid }}/{{user.name | slugify}}" 
      class="snip1336 shadow-1">
      <figcaption>
        <img src="{{ user.avatar }}" alt="{{user.name}}" class="profile" />
        <h2>{{user.name}}<span>{{user.job}}</span></h2>
      </figcaption>
    </figure>
    </div>
    </masonry-brick>
  </masonry>
</md-card>
</div>
  `,
  styles: [`
  *:after, *:before {
    content: "";
}

*:after {
    clear: both;
}

.users-box {
    margin-right: auto;
    margin-left: auto;
    text-align: center;
    overflow:hidden;
}
.snip1336 {
  cursor: pointer;
  font-family: 'Roboto', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  color: #ffffff;
  text-align: left;
  line-height: 1.4em;
  background: url('./assets/styles/bg3.png');
  border-radius: 4px;
  height: 200px;
  padding:150px 0 150px 0;
  margin-bottom: 10px;
}


.snip1336 img {
  max-width: 100%;
  vertical-align: top;
  opacity: 0.85;
   border:10px solid #00ACC1;
}
.snip1336 figcaption {
  width: 100%;
  background-color:  #0097A7;
  padding: 15px !important;
  position: relative;
}
.snip1336 figcaption:before {
  position: absolute;
  content: '';
  bottom: 100%;
  left: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 55px 0 0 400px;
  border-color: transparent transparent transparent #0097A7;
}

.snip1336 .profile {
  border-radius: 50%;
  position: absolute;
  bottom: 100%;
  left: 25px;
  z-index: 1;
  max-width: 90px;
  opacity: 1;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.snip1336 h2 {
  margin: 0 0 5px;
  font-weight: 300;
}
.snip1336 h2 span {
  display: block;
  font-size: 0.9em;
  color: #ccd;
}
.snip1336 p {
  margin: 0 0 10px;
  font-size: 0.8em;
  letter-spacing: 1px;
  opacity: 0.8;
}
img.profile {
  width: 80px;
  height: 80px;
  border-radius: 100%;
}
  `]
})
export class UsersCard implements OnInit {
users: any;
@Input() limit: any;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService._isUsers()
    .subscribe(value => { 
     this.users = value;
    });
  }

}

@Component({
  selector: 'app-usersOnlinecard',
  template: `
  <div class="no-sm">
  <div class="clearfix"></div>
   <md-card>
     <div *ngFor="let user of users let i=index">
       <img  *ngIf="i<limit" routerLink="/user/{{ user.uid }}/{{user.name | slugify}}" class="shadow-1" src="{{user.avatar}}" alt="user" mdTooltip="{{user.name}}">
     </div>
     <span><a routerLink="/users"><i class="fa fa-circle" aria-hidden="true"></i> <i class="fa fa-circle" aria-hidden="true"></i> <i class="fa fa-circle" aria-hidden="true"></i></a></span>
   </md-card>
   <div class="clearfix"></div>
   </div>
  `,
   styles: [`
   @media screen and (min-width: 769px){
    .no-sm {
    padding: 0 13px;
    overflow:hidden;
  }
}
span{
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    font-size: 0.4em;
}
   md-card img {
     height: 40px;
     width: 40px;
     border-radius: 100%;
     float: left;
     margin-right: 10px;
     cursor: pointer;
   }
    md-card {
      margin: 0px 0 10px 0;
      clear:both;
      border-radius: 0 !important;
      box-shadow: 0 1px 1px -2px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 1px 0 rgba(0,0,0,.12) !important;
          padding: 20px !important;
      border-bottom: 2px solid #0097A7 !important;
  }
  @media screen and (min-width: 769px){
   md-card {
      border-radius: 4px !important;
      display: flex;
      margin-top: 10px;
  }
  }
   `]

})
export class UsersOnlineCard implements OnInit {
 statusShow: boolean = false;
users: any;
@Input() limit: any;
  constructor(
    private _authService: AuthService,
    ) { }

  ngOnInit() {
    this._authService._isUsers()
    .subscribe(value => { 
     this.users = value;
    });
  }
}
