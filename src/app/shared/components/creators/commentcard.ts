import { Component, OnInit, Output, EventEmitter, Optional, Input } from '@angular/core';
import { StatusService } from '../../services/status/status.service';
@Component({
  selector: 'app-commentcard',
  template: `
     <div class="form-group comm">
         <form (ngSubmit)="onCreateComment(status.sid)">
         <div class="row">

         <div class="col-10">
           <textarea class="form-control"
            [(ngModel)]="comment"
            name="comment"
            placeholder="Write a comment!"
           >
           </textarea>
           </div>
           <div class="col-2">
           <button md-raised-button type="submit" color="primary">Add</button>
           </div>
           </div>
         </form>
    </div>
  `,
   styles: [`
   .comm {
     width: 92%;
     margin-right: auto;
     margin-left: auto;
   }
   button {
     min-width: 0 !important;
     width: 100% important;
     height: 45px;
   }
     textarea {
         height: 45px !important;
         overflow: hidden;
     }
  `]
 
})
export class CommentCard implements OnInit {
@Input() status = {};
comment: any;
  constructor(
      private statusService: StatusService,
    ) { }

  ngOnInit() {
    
  }

  onCreateComment(sid) {
       if (this.comment) {
          this.statusService.createComment( this.comment, sid);
          this.reset();
        }

  }

  reset() {

     this.comment = ''
  }

}
