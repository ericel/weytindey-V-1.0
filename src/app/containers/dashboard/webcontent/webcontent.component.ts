import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { PageService } from './../../../shared/services/page/page.service';
import { NotificationService } from './../../../shared/services/notification/notification.service';
import * as firebase from 'firebase';
import 'rxjs/add/operator/first';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-webcontent',
  templateUrl: './webcontent.component.html',
  styleUrls: ['./webcontent.component.css']
})
export class WebcontentaddComponent implements OnInit {
types = ['Politics', 'Education', 'Health', 'Opinion', 'Gossip', 'Secrets', 'Corruption', 'Sports', 'Lifestyle', 'Social', 'Food', 'Recipe', 'Economy', 'Video'];
 blogForm : FormGroup;
  submitted = false;
  uploading: boolean = false;
  token;
  token_url;
  image = './assets/img/_blog.jpg'; CREATE_KEY: string = 'blog_create_token';
  storageRef; 
 blogCat; blogTitle;
  constructor(
    private fb: FormBuilder,
    private _pageService: PageService,
    private _notify: NotificationService
  ) { }

  ngOnInit() {
     
     this.blogForm = this.fb.group({
      'blogCat': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'blogTitle': [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(150)])],
      'blogDesc': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      'blogUrl': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(100000)])],
      'videoUrl': ['']
     });
  }
 upload() {
      this.token = window.localStorage.getItem(this.CREATE_KEY);
      this.token = Md5.hashStr(new Date() + 'eWebcontent');
      this.storageRef = firebase.storage().ref().child(`eWebcontent/${this.token}`);
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
  submitForm(blog){
    this.blogCat = blog.blogCat;
    this.blogTitle = blog.blogTitle;
    this._pageService.createWebContent(blog, this.token, this.image);
    this.submitted = true;
     var i = 5;
     var myinterval = setInterval(() => {
        document.getElementById("countdown").innerHTML = "resetting in: " + i;
        if (i === 0) {
            clearInterval(myinterval );
             this.reset();
        }
        else {
            i--;
        }
    }, 1000);
    
  }

  reset (){
    this.blogForm.reset();
  }
}
