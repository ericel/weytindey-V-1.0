import { Component, ElementRef, OnInit, AfterViewInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AnimationService, AnimationBuilder } from 'css-animator';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit, AfterViewInit {
  user = {
    password: '',
    email: ''
  };
  isAuthorized: boolean = false;
  mode: string = 'signin';
  private _animator: AnimationBuilder;
  constructor(
  private _elementRef: ElementRef,
   animationService: AnimationService,
   private auth: AuthService,
   private router: Router,
   private _location: Location
  ) {
    this._animator = animationService.builder();
    //this.auth.signout();
   }

  ngOnInit() {
     this.auth.userAuth
    .subscribe(value => { 
    if(value){ this._location.back(); } 
     else {this.isAuthorized = false} });
  }
  
  ngAfterViewInit() {
    this._animator
      .setType('shake')
      .setDelay(150)
      .setDuration(700)
      //.show(this._elementRef.nativeElement);
  }

 authenticate(provider : string) {
    this.auth.login(provider);
    //this.auth.authenticate(provider, this.user)
    //.subscribe(() => this.router.navigate(['']))
  }
 
}
