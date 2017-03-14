import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MetaService } from 'ng2-meta/src';
import { StatusService } from './shared/services/status/status.service';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
isDarkTheme: boolean = false;
isPurpleTheme: boolean = false;
isGrayTheme: boolean = false;
route: string;
progress: boolean = false;
	constructor(
    private metaService: MetaService,
    vRef: ViewContainerRef,
    public toastr: ToastsManager,
    private router: Router,
    private location: Location,
    private cd: ChangeDetectorRef,
    private _statusService: StatusService
	){
    this.toastr.setRootViewContainerRef(vRef);
    this.router.events.subscribe(event => {
         const token_create_blog = window.localStorage.getItem("blog_create_token");
         if(token_create_blog) {window.localStorage.removeItem("blog_create_token")};
         const token_upload_file = window.localStorage.getItem("upload_file");
         if(token_upload_file) {this._statusService.deleteUnUploadedFile(); return};
       
            this.route = location.path();
            if(this.route === '/add' || this.route === '/add/blog' || this.route.search("editblog") !== -1){
              this.isDarkTheme = false;
              this.isPurpleTheme = false;
              this.isGrayTheme = true;
            } else {
              this.isGrayTheme = false;
              this.isDarkTheme = false;
              this.isPurpleTheme = false;
            } 

       });

   router.events.forEach((event) => {
    if(event instanceof NavigationStart) {
      this.progress = true;
    }
    if(event instanceof NavigationEnd){
      
      setInterval(() => {
        this.progress = false;
     }, 5000);
    }
   /* if(event instanceof NavigationError){
      this.router.navigate(['']);
      window.location.reload()
    }

     if(event instanceof RoutesRecognized){
     
    }
    */
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
  });
 }
 

  ngOnInit() {
      this.cd.markForCheck(); // marks path
      
  }
  
   
}