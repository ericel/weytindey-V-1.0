import { Component, OnInit,  NgZone, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { PageService } from './../../../../shared/services/page/page.service';
import { NotificationService } from './../../../../shared/services/notification/notification.service';
import * as firebase from 'firebase';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
types = ['Politics', 'Education', 'Health', 'Opinion', 'Gossip', 'Secrets', 'Corruption', 'Sports', 'Lifestyle', 'Social', 'Food', 'Recipe', 'Economy'];
editorTxt = "Start Writing your blog...";
  title_0: boolean = false;
  title_1: boolean = false;
  pad_top: boolean = true;
  blogForm : FormGroup;
  submitted = false;
  uploading: boolean = false;
  token;
  token_url;
  image = './assets/img/_blog.jpg'; CREATE_KEY: string = 'blog_create_token';
  storageRef;
 
  constructor(
    private fb: FormBuilder,
    private _pageService: PageService,
    private _notify: NotificationService
  ) {
    
   }

  ngOnInit() {
     this.blogForm = this.fb.group({
      'blogCat': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'blogTitle': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(150)])],
      'blogDesc': [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(500)])],
      //'blogFull': [null, Validators.compose([Validators.required, Validators.minLength(150), Validators.maxLength(100000)])]
    });
    
    this.blogForm.controls["blogCat"].valueChanges
     .debounceTime(1000) // wait a litle after the user input (ms)
     .subscribe(blogcat => {
        if(blogcat !== ''){
         this.pad_top = false;
        }
          this.blogForm.controls["blogTitle"].valueChanges
          .debounceTime(1000) // wait a litle after the user input (ms)
           .subscribe(title => {
              if(title !== '' && title.length > 29){
               this._pageService.createBlog(blogcat, title, this.image); 
               this.title_0 = true;
              }
          });
     });

    this.blogForm.controls["blogDesc"].valueChanges
        
         .debounceTime(1000) // wait a litle after the user input (ms)*/
          .subscribe(blogDesc => {
              if(blogDesc !== '' && blogDesc.length > 150){
               this._pageService.updateBlogDesc(blogDesc); 
               this.title_1 = true;
           }
     });


     /* this.blogForm.controls["blogFull"].valueChanges
          .debounceTime(3000) // wait a litle after the user input (ms)
          .subscribe(blogFull => {
            console.log('changes');
              if(blogFull !== '' && blogFull.length > 150){
               this._pageService.updateBlogFull(blogFull); 
                
           }
     });*/

  }
  
    upload() {
      this.token = window.localStorage.getItem(this.CREATE_KEY);
      this.storageRef = firebase.storage().ref().child(`eblogs/${this.token}`);
      this.uploading = true;
        let selectedFile = (<HTMLInputElement>document.getElementById('file-b')).files[0];
        this.storageRef.put(selectedFile).then(snapshot => {
          this.storageRef.getDownloadURL().then(url => {
            this.image = url;
            this._pageService.updateBlogPhoto(url);
             this.uploading = false;
          });
        });
        
    }

    keyupHandlerFunction(e){
      if(e !== '' && e.length > 150){
           this._pageService.updateBlogFull(e), {enableHTML: true};
      }
     
    }

  submitForm(blog: any){
    this._pageService.publishBlog(blog, this.image)
    .then((success) => {
      this.submitted = true;
      let path = '/content/_blog/'  + this.convertToSlug(blog.blogCat);
      this._notify.countDown(path, window.localStorage.getItem(this.CREATE_KEY), blog.blogTitle);
      window.localStorage.removeItem(this.CREATE_KEY);
    })
  }

 convertToSlug(Text)
    {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }
}
