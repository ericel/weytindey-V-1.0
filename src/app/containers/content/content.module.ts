import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { MasonryModule } from 'angular2-masonry';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { AuthService } from './../../shared/services/auth/auth.service';
import { SimpleTinyCard } from './../../shared/components';
import { SharedModule } from './../../shared/shared.module';
import { AddComponent } from './add/add.component';
import { BlogComponent } from './add/blog/blog.component';
import { BlogsComponent } from './blogs/blogs.component';
import { Routes, RouterModule } from '@angular/router';
import { EditblogComponent } from './add/blog/editblog/editblog.component';
import { LinkyModule } from 'angular2-linky';
import { WebcontentComponent } from './contentpage/webcontent/webcontent.component';
import { StatusComponent } from './contentpage/status/status.component';
import { BlogcontentComponent } from './contentpage/blogcontent/blogcontent.component';
import { PageComponent } from './add/page/page.component';
import { JobComponent } from './add/job/job.component';
import { PlaceComponent } from './add/place/place.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { PageweyComponent } from './contentpage/pagewey/pagewey/pagewey.component';
const routes: Routes = [
{ path: 'add', component: AddComponent,
    data: {
       meta: {
        title: 'Create Content',
        description: 'One place web from mama Africa. Afro music, videos, blogs, news. All in one place.',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 { path: 'add/blog', component: BlogComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'Write a blog',
        description: 'Write a blog'
       }
    }
 },
 { path: 'add/page', component: PageComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'Create a page',
        description: 'Create a page'
       }
    }
 },
 { path: 'add/job', component: JobComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'Post a job',
        description: 'Post a job'
       }
    }
 },
 { path: 'add/place', component: PlaceComponent,
  canActivate: [AuthService],
    data: {
       meta: {
        title: 'List a Place',
        description: 'List a place'
       }
    }
 },
 { path: 'stories', component: BlogsComponent,
    data: {
       meta: {
        title: 'Africa News Today',
        description: 'Africa News Today',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
  {
   path: 'content/blog/:string/:cid/:string',
   component: BlogcontentComponent
  }
  ,
  {
   path: 'page/:pid/:string',
   component: PageweyComponent
  }, 
  {
   path: '_blog/editblog/:bid/:string',
   component: EditblogComponent,
   canActivate: [AuthService],
    data: {
       meta: {
        title: 'Edit Blog',
        description: 'Edit a blog'
       }
    }
  },
   {
   path: 'content/:string/:pid/:string',
   component: StatusComponent
  },
  {
   path: 'webcontent/:string/:wid/:string',
   component:  WebcontentComponent
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
    LinkyModule,
    Ng2PaginationModule
  ],
  declarations: [
    AddComponent,
    BlogComponent,
    BlogsComponent,
    SimpleTinyCard,
    EditblogComponent,
    WebcontentComponent,
    StatusComponent,
    BlogcontentComponent,
    PageComponent,
    JobComponent,
    PlaceComponent,
    PageweyComponent
  ]
})
export class ContentModule { }
