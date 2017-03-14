import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { MasonryModule } from 'angular2-masonry';
import { AuthService } from './../../shared/services/auth/auth.service';
import { SharedModule } from './../../shared/shared.module';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { EdituserComponent } from './profile/edituser/edituser.component';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import {Ng2PaginationModule} from 'ng2-pagination';
const routes: Routes = [
{ path: 'authentication', component: SignupComponent,
    data: {
       meta: {
        title: 'user authentication',
        description: 'Join Idonsuffer for free',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 { path: 'users', component: UsersComponent,
    data: {
       meta: {
        title: 'IDS Users',
        description: 'IDS Users Online',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
  {
   path: 'user/:id/:string',
   component: ProfileComponent
  },
  {
   path: 'edit/:id/:string',
   component: EdituserComponent,
   canActivate: [AuthService],
   data: {
      title: 'Edit Profile'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule,
    MaterialModule.forRoot(),
     NgPipesModule,
    MaterialModule.forRoot(),
     AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    SharedModule,
    MomentModule,
    MasonryModule,
    Ng2PaginationModule
  ],
  declarations: [
    SignupComponent,
    EdituserComponent,
    ProfileComponent,
    UsersComponent
  ]
})
export class AuthModule { }
