import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../../../../shared/services/auth/auth.service';
import { PageService } from '../../../../../shared/services/page/page.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import * as firebase from 'firebase';
@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {
id: string;
editForm : FormGroup;
submitted = false;
blogTitle: string;
blogCat: string;
blogDesc : string;
blogphoto: string;
blogFull: string;
uploading: boolean = false;
storageRef;
blog;
image = './assets/img/_blog.jpg';
types = ['Politics', 'Education', 'Health', 'Opinion', 'Gossip', 'Secrets', 'Corruption'];
isAuthorized: boolean = false;
 user;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _pageService: PageService,
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit() {
     this.route.params.subscribe(params => {
        this.id = params['bid'];
        let str = params['string'];

     this._pageService.getPageBlg(this.id).subscribe(page =>  {this.blog = page;
         if(!this.blog){
            this.router.navigate(['/signup']);
         }
    });

    this._authService.userAuth
    .subscribe(value => { 
     if(value){this.isAuthorized = true; this.user = value; } 
     else {this.isAuthorized = false} });
  

    });//route
    
  }
  upload() {
      this.storageRef = firebase.storage().ref().child(`eblogs/${this.id}`);
      this.uploading = true;
        let selectedFile = (<HTMLInputElement>document.getElementById('file-b')).files[0];
        this.storageRef.put(selectedFile).then(snapshot => {
          this.storageRef.getDownloadURL().then(url => {
            this.image = url;
            this._pageService.updateEditBlogPhoto(url, this.id);
             this.uploading = false;
          });
        });
        
    }
 keyupHandlerFunction(e){
      if(e !== '' && e.length > 150){
           this._pageService.updateBlogText(e, this.id);
      }
     
    }
  onSubmitEdit (blog){
    this._pageService.updateEditedBlog(blog, this.id, this.image);
  }

}
