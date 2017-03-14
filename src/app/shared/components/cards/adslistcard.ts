import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adslist',
  template:`
   <div class="mar-10"></div>
	<md-card class="google shadow-2">
  <ng2-adsense
    [adClient]="'ca-pub-2243338195594977'"
    [adSlot]="7979162777">
  </ng2-adsense>
 </md-card>
 <div class="mar-10"></div>
<md-card class="text-center shadow-2 md-adds" >
   <md-card-subtitle>Free Accounts Now!</md-card-subtitle>
   <md-card-title>Join and  share with weytindey</md-card-title>   
   <md-card-content>
        <i class="fa fa-cloud-upload fa-5x" aria-hidden="true"></i>
       <h3><a routerLink="/gettingstarted">Get Started for free</a></h3>
   </md-card-content>
   <md-card-actions>
        <button md-button routerLink="/authentication">Sign Up Now</button>
   </md-card-actions>
</md-card>
<div class="mar-10"></div>
<md-card class="google">
<ng2-adsense
    [adClient]="'ca-pub-2243338195594977'"
    [adSlot]="7581452770">
  </ng2-adsense>
</md-card>
  `,
  styles: [`
   md-card {
     
   }
   .md-adds {
     background: #006064;
     color: #fff;
   }
    md-card.google {
     padding:2px !important;
   }
  `]
})
export class AdslistCard implements OnInit {

  constructor() { }

  ngOnInit() {
 
  }

}

@Component({
  selector: 'app-adsone',
  template:`
  <div class="mar-10"></div>
	<md-card class="google shadow-2">
  <ng2-adsense
    [adClient]="'ca-pub-2243338195594977'"
    [adSlot]="8059130774">
  </ng2-adsense>
 </md-card>
 <div class="mar-10"></div>

  `,
  styles: [`
   md-card {
     
   }
    md-card.google {
     padding:2px !important;
   }
   
  `]
})
export class AdsOneCard implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-adsmovies',
  template:`
  <div class="mar-10 ads" >
	  <md-card> <button md-raised-button color="primary" routerLink="/movies">Free Movies Online</button>
    <div class="mar-10"></div>
    <button md-raised-button color="warn" routerLink="/movies">Share a movie online for free</button>
    </md-card>
 </div>

  `,
  styles: [`
    .ads md-card {
     height: 250px;
     width: 100%;
     background: url('./assets/styles/gifmovies.gif');
     background-size: 100% 100%;
   }
    md-card.google {
     padding:2px !important;
   }
   
  `]
})
export class AdsmoviesCard implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-adsmusic',
  template:`
  <div class="mar-10 ads">
	   <md-card>
      <button md-raised-button color="primary" routerLink="/music/">African Music</button>
      <div class="mar-10"></div>
      <button md-raised-button color="primary" routerLink="/music/">Listen And Share Music Online</button>
    </md-card>
 </div>

  `,
  styles: [`
   .ads md-card {
     height: 250px;
     width: 100%;
     background: url('./assets/styles/gifmusic.gif');
     background-size: 100% 100%;
   }
    md-card.google {
     padding:2px !important;
   }
   
  `]
})
export class AdsmusicCard implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-adscreate',
  template:`
  <div class="mar-10 ads">
	  <md-card>
      <button md-raised-button color="primary" routerLink="/add/createads/">Click Here</button>
    </md-card>
 </div>

  `,
  styles: [`
   .ads md-card {
     height: 250px;
     width: 100%;
     background: url('./assets/styles/gifcreate.gif');
     background-size: 100% 100%;
   }
    md-card.google {
     padding:2px !important;
   }
   
  `]
})
export class AdscreateCard implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

