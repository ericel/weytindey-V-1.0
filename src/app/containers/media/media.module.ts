import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music/music.component';
import {  UploadComponent } from './upload/upload.component'
import { Routes, RouterModule } from '@angular/router';
import { MasonryModule } from 'angular2-masonry';
import {NgPipesModule} from 'ngx-pipes';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './../../shared/services/auth/auth.service';
import { MusicfileComponent } from './music/musicfile/musicfile.component';
import {Ng2PaginationModule} from 'ng2-pagination';
import { PlaylistComponent } from './playlist/playlist.component';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
const routes: Routes = [
{ path: 'music', component: MusicComponent,
    data: {
       meta: {
        title: 'Best Of African Music',
        description: 'African Music Online',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 { path: 'media/upload', component: UploadComponent,
 canActivate: [AuthService],
    data: {
       meta: {
        title: 'Share your Africa Music Online',
        description: 'Share your Africa Music Online',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
  {
   path: 'music/audio/:mid/:string',
   component:  MusicfileComponent
  }
  ,
  {
   path: 'music/playlist/:mid/:string',
   component:  PlaylistComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MasonryModule,
    MaterialModule.forRoot(),
    FormsModule, ReactiveFormsModule,
    NgPipesModule,
    Ng2PaginationModule,
     VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    MusicComponent,
    UploadComponent,
    MusicfileComponent,
    PlaylistComponent
  ]
})
export class MediaModule { }
