import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { AuthService } from './../../shared/services/auth/auth.service';
import { Routes, RouterModule } from '@angular/router';
import { LinkyModule } from 'angular2-linky';
import { SharedModule } from './../../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebcontentaddComponent } from './webcontent/webcontent.component';
import {Ng2PaginationModule} from 'ng2-pagination';
const routes: Routes = [
{ path: 'dashboard', component: DashboardComponent,
 canActivate: [AuthService],
    data: {
       meta: {
        title: 'Admin Dashboard',
        description: 'One place Management for Accounts and Content!'
       }
    }
 },
 { path: 'dashboard/webcontent', component: WebcontentaddComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'Add content from web',
        description: 'One place Management for Accounts and Content!'
       }
    }
 }
]
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
    LinkyModule,
    Ng2PaginationModule
  ],
  declarations: [
    DashboardComponent,
    WebcontentaddComponent
  ]
})
export class DashboardModule { }
