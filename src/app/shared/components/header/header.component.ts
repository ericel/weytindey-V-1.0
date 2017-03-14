import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  moduleId: module.id,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

isAuthorized: boolean = false;
 showStyle: false;
  searchThis;
  route: string;
  cat: string;
  user;
  searchForm : FormGroup;
  constructor(
    private _elementRef: ElementRef,
    private _authService: AuthService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
     this.router.events.subscribe(event => {
       //console.log(location.path());
      
            this.route = location.path();
            
            if(this.route === '/add' || this.route === '/add/blog'){
              this.cat = "ADD"
            } else if(this.route.search("editblog") !== -1) {
              this.cat = "Edit"
            } else {
              this.cat = "HOME"
            }
      
       });
   }

  ngOnInit() {
     this.searchForm = this.fb.group({
      'search_term': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
    });

    this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }
 
focusChange(){
  if(this.showStyle) {
      return "#8ac53e";
    } else {
      return "#D32F2F";
    }
 }

  reset() {
    this.searchForm.reset();
  }

  logout(){
    this._authService.logout();
  }

  search(search){
     this.router.navigate([`/search/${search.search_term}`]);
  }
}
