import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { PageweyService } from './../../../../shared/services/pagewey/pagewey.service';
@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
types = ['Country', 'Person', 'Business', 'Band', 'Artist', 'Place'];
pageForm : FormGroup;
submitted = false;
  constructor(
    private fb: FormBuilder,
    private _pageweyService: PageweyService
  ) { }

  ngOnInit() {
    this.pageForm = this.fb.group({
      'pageCat': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'pageTitle': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(150)])],
      'pageDesc': [null, Validators.compose([Validators.required, Validators.minLength(50), Validators.maxLength(500)])]
    });
  }

submitPage(page: any){
  this._pageweyService.createPage(page);
    /*this._pageService.publishpage(page, this.image)
    .then((success) => {
      this.submitted = true;
      let path = '/content/_page/'  + this.convertToSlug(page.pageCat);
      this._notify.countDown(path, window.localStorage.getItem(this.CREATE_KEY), page.pageTitle);
    })*/
  }
}
