import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../shared/services/status/status.service';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
news=[];
newspagesOk: boolean = false;
  constructor(
    private _statusService: StatusService
  ) { }

  ngOnInit() {
    this._statusService.getStatus()
    .subscribe(pages => { this.news = pages; 
      if(pages){
        this.newspagesOk = true;
      }
        this.news.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });
        this.news = this.news.filter(function(a) {
            return a.contenttag !== "Question" && a.contenttag !== "Status Update" && a.contenttag !== "Audio";
        });
    
    });
  }
 onStatusChecked(status) {
    this._statusService.rateStatus(status);
  }
   stories(){
    this._statusService.getStatus().first()
    .subscribe(statuses => {  
       this.news =  statuses.filter(function(a){
            return a.contenttag !== "Audio" && a.contenttag !== "Status Update" && a.contenttag !== "Question";
      });
    });
   }

   education(){
     this._statusService.getStatus().first()
    .subscribe(statuses => {  
       this.news =  statuses.filter(function(a){
            return a.type === "Education";
        });
    }); 
   }

   videos(){
     this._statusService.getStatus().first()
    .subscribe(statuses => {  
       this.news =  statuses.filter(function(a){
            return a.type === "Video";
        });
    }); 
   }

  politics(){
     this._statusService.getStatus().first()
    .subscribe(statuses => {  
       this.news =  statuses.filter(function(a){
            return a.type === "Politics";
        });
    }); 
   }

   sport(){
     this._statusService.getStatus().first()
    .subscribe(statuses => {  
       this.news =  statuses.filter(function(a){
            return a.type === "Sports";
        });
    }); 
   }
createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
}
