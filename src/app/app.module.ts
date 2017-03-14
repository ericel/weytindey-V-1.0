import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {ToastModule, ToastOptions} from 'ng2-toastr/ng2-toastr';
import { MetaModule, MetaConfig } from 'ng2-meta/src';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule, MdSnackBarConfig } from '@angular/material';
import { AdsenseModule } from 'ng2-adsense';
import {NgPipesModule} from 'ngx-pipes';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MomentModule} from 'angular2-moment';
import { AnimationService, AnimatesDirective } from 'css-animator';
import 'hammerjs';

//import { TagInputModule } from 'ng2-tag-input';

import { HomeModule } from './containers/home/home.module';
import { CommonsModule } from './containers/commons/commons.module';
import { ContentModule } from './containers/content/content.module';
import { MediaModule } from './containers/media/media.module';
import { AuthModule } from './containers/auth/auth.module';
import { DashboardModule } from './containers/dashboard/dashboard.module';
import { AppComponent } from './app.component';
import { Store } from './store';

import { SERVICE_PROVIDER } from './shared/services'
import { TEMPLATE_COMPONENTS } from './shared/components';
import { ENTRY_COMPONENTS } from './shared/components';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'about', loadChildren: './containers/commons/commons.module#CommonsModule' },
 /*{ path: 'add', loadChildren: './containers/content/content.module#ContentModule' },
  { path: 'add/blog', loadChildren: './containers/content/content.module#ContentModule'},
  { path: 'content/:string/:pid/:string', loadChildren: './containers/content/content.module#ContentModule'},
 { path: 'content/_blog/:string/:bid/:string', loadChildren: './containers/content/content.module#ContentModule' },
  { path: 'webcontent/link/:string/:cid/:string/_blank', loadChildren: './containers/content/content.module#ContentModule' },
  { path: '**', loadChildren: './containers/commons/commons.module#CommonsModule' },
   { path: 'stories', loadChildren: './containers/content/content.module#ContentModule' },
  { path: 'authentication', loadChildren: './containers/auth/auth.module#AuthModule' },
  { path: 'music', loadChildren: './containers/media/media.module#MediaModule' },
  { path: 'music', loadChildren: './containers/media/media.module#MediaModule' },
  { path: 'music/audio/:mid/:string', loadChildren: './containers/media/media.module#MediaModule' },
  { path: 'user/:id/:string', loadChildren: './containers/auth/auth.module#AuthModule' },
  { path: 'edit/:id/:string', loadChildren: './containers/auth/auth.module#AuthModule' },
  */
];


const metaConfig: MetaConfig = {
  //Append a title suffix such as a site name to all titles
  //Defaults to false
  useTitleSuffix: true,
  defaults: {
    title: 'Africa #1 Website',
    titleSuffix: ' ',
    'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png',
    'any other': 'arbitrary tag can be used'
  }
};

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyDDZrLSmfW67BUfeDbl0oKhGKrEEc1DaVg",
    authDomain: "enoeasy-94b34.firebaseapp.com",
    databaseURL: "https://enoeasy-94b34.firebaseio.com",
    storageBucket: "enoeasy-94b34.appspot.com",
    messagingSenderId: "586504231618"
};

 export class CustomOption extends ToastOptions {
      animate = 'flyRight'; // you can override any options available
      newestOnTop = false;
      showCloseButton = true;
 }

@NgModule({
  declarations: [
    AppComponent,
    ...TEMPLATE_COMPONENTS
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
     AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBqIrNb1DLsN6oP97ua3YLMJx5-gUueWJU',
      libraries: ['places']
    }),
     AdsenseModule.forRoot({
      adClient: 'ca-pub-2243338195594977',
      adSlot: 7979162777
    }),
    MaterialModule.forRoot(),
    MetaModule.forRoot(metaConfig),
    ToastModule.forRoot(),
    HomeModule,
    CommonsModule,
    ContentModule,
    AuthModule,
    DashboardModule,
    MediaModule,
    NgPipesModule,
    MomentModule
    //TagInputModule
  ],
  providers: [
    ...SERVICE_PROVIDER,
    AnimationService,
    Store,
    {provide: ToastOptions, useClass: CustomOption}
    ],
    entryComponents: [
    ...ENTRY_COMPONENTS
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
