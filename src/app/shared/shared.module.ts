import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgPipesModule} from 'ngx-pipes';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { AdsenseModule } from 'ng2-adsense';
import {MomentModule} from 'angular2-moment';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ng2-tag-input';
import { MasonryModule } from 'angular2-masonry';
import { SHARED_COMPONENTS } from './../shared/components';
import { LinkyModule } from 'angular2-linky';
import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';
@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    NgPipesModule,
    MaterialModule.forRoot(),
    AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    RouterModule,
    MomentModule,
    TagInputModule,
    MasonryModule,
    LinkyModule,
     VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  declarations: [
    ...SHARED_COMPONENTS 
    ],
 exports: [
   ...SHARED_COMPONENTS 
    ]
})
export class SharedModule { }
