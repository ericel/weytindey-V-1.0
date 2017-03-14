import { Component, OnInit,  ElementRef, Optional, ViewContainerRef,AfterViewInit,
 trigger,
  state,
  style,
  transition,
  animate,
  keyframes } from '@angular/core';
import { StatusService } from '../../../shared/services/status/status.service';
import { PageService } from '../../../shared/services/page/page.service';
import { Store } from './../../../store';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    transition('void => *', [
      animate(300, keyframes([
        style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
        style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
        style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
      ]))
    ]),
    transition('* => void', [
      animate(300, keyframes([
        style({opacity: 1, transform: 'translateX(0)',     offset: 0}),
        style({opacity: 1, transform: 'translateX(-15px)', offset: 0.7}),
        style({opacity: 0, transform: 'translateX(100%)',  offset: 1.0})
      ]))
    ])
  ])
]
})
export class HomeComponent implements OnInit, AfterViewInit {
  items;
  showMore: boolean = false;
  statuses = []; promopages = [];
  lastDialogResult: string; 
  statusesOk: boolean = false;
  loadStatuses = [];
 
  constructor(
    private store: Store,
    private statusService: StatusService,
    private _dialog: MdDialog,
    private _PageService: PageService
    ) { 
     
    
     }
  
  ngOnInit() {

  
   /*this.statusService.getStatus()
    .subscribe(statuses => this.statuses = statuses);
   
    /*this.store.changes.pluck('notes')
    .subscribe((statuses: any) =>  this.statuses = statuses);
    */
   
   this.statusService.getStatus().first()
    .subscribe(statuses => { this.statuses = statuses; 
      if(this.statuses){
        this.statusesOk = true; 
        this.statuses =  statuses.filter(function(a){
            return a.contenttag !== "Audio";
        });
      } 
 });

  }
 
  ngAfterViewInit() {

  }

 toggleShow() {
    this.showMore = !this.showMore;
  }


  onStatusChecked(status) {
    this.statusService.rateStatus(status);
  }

  createRange(len=32) {
    let arr = [];
    for(let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }
  
   stories(){
    this.statusService.getStatus().first()
    .subscribe(statuses => {  
       this.statuses =  statuses.filter(function(a){
            return a.contenttag !== "Audio" && a.contenttag !== "Status Update" && a.contenttag !== "Question";
      });
    });
   }

   music(){
     this.statusService.getStatus().first()
    .subscribe(statuses => {  
       this.statuses =  statuses.filter(function(a){
            return a.contenttag === "Audio";
        });
    }); 
   }

   questions(){
     this.statusService.getStatus().first()
    .subscribe(statuses => {  
       this.statuses =  statuses.filter(function(a){
            return a.contenttag === "Question";
        });
    }); 
   }

   jobs(){
     this.statusService.getStatus().first()
    .subscribe(statuses => {  
       this.statuses =  statuses.filter(function(a){
            return a.contenttag === "Job";
        });
    }); 
   }

    places(){
     this.statusService.getStatus().first()
    .subscribe(statuses => {  
       this.statuses =  statuses.filter(function(a){
            return a.contenttag === "Place";
        });
    }); 
   }
}

