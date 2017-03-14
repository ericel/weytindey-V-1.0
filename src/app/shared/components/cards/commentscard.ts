import { Component, OnInit, Output, EventEmitter, Optional, Input} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StatusService } from '../../services/status/status.service';
import 'rxjs/add/operator/first';
@Component({
  selector: 'app-commentscard',
  template: `
   <div *ngFor="let comment of comments  let i=index  " class="comments">
   <div *ngIf="i<limit">
    <md-card-header>
           <img md-card-avatar src="{{comment.avatar}}">
           <div class="votes-comment">
            <i class="fa fa-chevron-up color-primary" aria-hidden="true" (click)="voteUpComment(comment)"></i>
              <span>{{comment.rating}}</span>
            <i class="fa fa-chevron-down color-down" aria-hidden="true" (click)="voteDownComment(comment)"></i>
           </div>
           <md-card-title><a routerLink="/user/{{ comment.uid }}/{{comment.username | slugify}}">{{comment.username | shorten: 8}}</a>  {{comment.createdAt | amTimeAgo:true}} ago!</md-card-title>
           <md-card-subtitle class="type-0">{{comment.comment}}</md-card-subtitle>
     </md-card-header>
     <div class="clearfix"></div>
    </div>
    <md-divider color="primary"></md-divider>
   </div>
   
  `,
  styles: [`
    .comments md-card-header {
      height: auto !important;
      min-height: 80px !important;
      clear: both !important;
     position: relative;

    }
    .comments {
      padding: 0 10px;
      margin:45px 0;
      clear:both;
     
    }
    .votes-comment {
      position: absolute;
      right: -20px;
      top: -2px;
    }
    .votes-comment span{
      position: relative;
      left:-5px;
      padding:10px;
      display: block;
    }
    .votes-comment i{
      cursor: pointer;
    }
    .comments md-card-avatar {
      width: 40px !important;
      height: 40px !important;
    }
    .comments md-card-subtitle {
      color: rgba(0, 0, 0, 0.91);
    }
    .comments .color-down {
          color: #713f3f;
    }
     md-divider {
    display: block;	
    border-top: 1px solid;		
    border-top-style: solid;
    border-top-width: 1px;
    margin: 0;
    border-color: #e6e4e4;
  }	
  `]
 
})
export class CommentsCard implements OnInit {
@Input() status: any;
@Input() limit: any;
comments;
isAuthorized: boolean = false;
  constructor(
    private _statusService: StatusService,
  ) { }

  ngOnInit() {
      this._statusService.getComments(this.status.sid).subscribe(comments => {
      this.comments = comments.filter(function(a){
            return a.createdAt;
        });
        this.comments.sort(function(a, b) {
            return b.createdAt - a.createdAt;
        });
      });

      
  }
 voteUpComment(comment){
    this._statusService.upVoteComment(comment);
  }
  voteDownComment(comment){
    this._statusService.downVoteComment(comment);
  }
}

