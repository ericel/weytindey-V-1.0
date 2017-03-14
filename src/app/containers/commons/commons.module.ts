import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { TermsComponent }  from './terms/terms.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
    {
    path: 'about', component: AboutComponent,
    data: {
       meta: {
        title: 'About Us',
        description: 'One place web from mama Africa. Afro music, videos, blogs, news. All in one place.',
        'og:image': 'https://enoeasy-94b34.firebaseapp.com/assets/img/logo_big.png'
       }
    }
 },
 {
  path: 'notfound404', 
  component: NotfoundComponent,
  data: {
      title: 'Page Not FOund'
    } 
  }
  
  
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AboutComponent,
    NotfoundComponent,
    TermsComponent
    ]
})
export class CommonsModule { }
