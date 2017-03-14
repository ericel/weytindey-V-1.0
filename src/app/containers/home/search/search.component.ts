import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StatusService } from '../../../shared/services/status/status.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy, AfterViewInit {
search_term;searches;searchedObj;
statusesOk: boolean = false;
searchHasResults: boolean = false;
sub;
  constructor(
    private route: ActivatedRoute,
    private _statusService: StatusService,
  ) { }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
         this.search_term = params['string'];
  
         this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
              }
         } 
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

 findByName(name) {
      var thisObject = [];
      for (var keys in this.searches) {
        var getThisObject = this.searches[keys];
        if (((getThisObject.status).toLowerCase()).indexOf(name.toLowerCase()) !== -1 ) {
          thisObject.push(this.searches[keys]);
        }
      }
      return thisObject
   }

   ngAfterViewInit() {
   
      
   }

  stories(){
      this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
                 this.searchedObj =  searchedObj.filter(function(a){
                      return a.contenttag !== "Audio" && a.contenttag !== "Status Update" && a.contenttag !== "Question";
                });
              }
         } 
      });
   }

   music(){
       this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
                 this.searchedObj =  searchedObj.filter(function(a){
                       return a.contenttag === "Audio";
                });
              }
         } 
      });

   }

   questions(){
       this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
                 this.searchedObj =  searchedObj.filter(function(a){
                       return a.contenttag === "Question";
                });
              }
         } 
      });
   }

   jobs(){
       this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
                 this.searchedObj =  searchedObj.filter(function(a){
                        return a.contenttag === "Job";
                });
              }
         } 
      });
   }

    places(){
       this._statusService.getStatus().first()
          .subscribe(searches => { this.searches = searches; 
            if(this.searches){
              this.statusesOk = true; 

              const searchedObj = this.findByName(this.search_term);
              if(searchedObj.length > 0){
                this.searchHasResults = true;
                this.searchedObj = searchedObj;
                 this.searchedObj =  searchedObj.filter(function(a){
                        return a.contenttag === "Place";
                });
              }
         } 
      }); 
   }

   ngOnDestroy(){
     this.sub.unsubscribe();
   }
}
