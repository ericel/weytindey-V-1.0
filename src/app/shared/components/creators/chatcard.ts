import { Component, OnInit, Output, EventEmitter, Optional, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { GeolocationService } from '../../services/geolocation/geolocation';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
import { StatusService } from '../../services/status/status.service';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { MessengerService } from '../../services/messenger/messenger.service';
@Component({

  selector: 'app-contactcard',
  template: `<div *ngIf="contactOn" class="contact-box">
	<div class="container">
    <div class="row gutter-10 chat-window col-sm-5 col-md-3" id="chat_window_1">
        <div class="col-sm-12 col-md-12">
        	<div class="panel panel-default">
                <div class="panel-heading top-bar">
                    <div class="pull-left">
                        <h3 class="panel-title"><i class="fa fa-commenting" aria-hidden="true"></i> Contact Us  - {{ userchat.name | shorten:8 : '.' }}</h3>
                    </div>
                    <div class="pull-right" style="text-align: right;">
                        <span id="minim_chat_window" class="fa fa-minus icon_minim"></span>
                        <span class="fa fa-times icon_close"  (click)="closeChat()"></span>
                    </div>
                </div>
                <div class="panel-body msg_container_base">
					<span *ngIf="!isAuthorized">
						 <em>You Need to <a routerLink="/authentication">Log in</a> to make contact</em>
					</span>
					<div *ngIf="isAuthorized" >
						<div class="s-into">
							One way secured contact form for our users! This messages can only be seen by you and your contact administrator.
						</div>
					<div *ngIf="contactMessages">
						<div *ngFor="let message of contactMessages">
                    <div *ngIf="message.con_type === 'admin_main' && 'ms_'+ userchat.uid === message.mid" class="row gutter-10 msg_container base_sent">
                        <div class="col-md-10 col-sm-10">
                            <div class="messages msg_sent">
                                <p>{{message.message}}</p>
                                <time>{{message.username | shorten: 8: '.'}} • {{message.createdAt | amTimeAgo:true}} ago!</time>
                            </div>
                        </div>
                        <div class="col-md-2 col-sm-2 avatar">
                            <img src="{{message.avatar}}" alt="{{message.username}}" class=" img-responsive ">
                        </div>
                    </div>
                    <div *ngIf="message.con_type === 'sender_main' && 'ms_'+ userchat.uid === message.mid" class="row gutter-10 msg_container base_receive">
                        <div class="col-md-2 col-sm-2 avatar">
                            <img src="{{message.avatar}}" alt="{{message.username}}" class=" img-responsive ">
                        </div>
                        <div class="col-md-10 col-sm-10">
                            <div class="messages msg_receive">
                                <p>{{message.message}}</p>
                                <time>{{message.username | shorten: 8: '.'}} • {{message.createdAt | amTimeAgo:true}} ago!</time>
                            </div>
                        </div>
                    </div>
					</div>
						<div class="s-into" *ngIf="nomessages">
							  We are waiting to hear from you. All inquiries are welcomed!
						</div>
					</div>
					
					</div>
                </div>
                <div class="panel-footer">
					 <form *ngIf="isAuthorized" [formGroup]="contactForm" (ngSubmit)="submitContact(contactForm.value)">
						<div class="container">
						<div class="row gutter-0">
						  <div class="col-md-8">
								<div  class="form-group" [ngClass]="{'has-error':!contactForm.controls['message'].valid && contactForm.controls['message'].touched}">
									<md-input-container>
									<textarea mdInput class="form-control input-sm chat_input"
											placeholder="Write your message here..."
											maxlength="500"
											#characterCountHint [formControl]="contactForm.controls['message']">
									</textarea>
									<md-hint align="end">{{characterCountHint.value.length}} / 500</md-hint>
									</md-input-container>
								
								<!-- The hasError method can work with the built in validators but custom validators as well -->
								<div *ngIf="contactForm.controls['message'].hasError('required') && contactForm.controls['message'].touched" class="alert alert-danger">Type your message..</div>
								<div *ngIf="contactForm.controls['message'].hasError('minlength') && contactForm.controls['message'].touched" class="alert alert-danger">Message must be atleast 1 character long</div>
								<div *ngIf="contactForm.controls['message'].hasError('maxlength') && contactForm.controls['message'].touched" class="alert alert-danger">Message cannot be more than 500 characters long.</div>
								</div>
						  </div>
						 <div class="col-md-4 ">
                            <button md-raised-button color="primary" class="pull-right" type="submit" [disabled]="!contactForm.valid">Send</button>
                          </div>
						</div>
						</div>
					 </form>
                    </div>
    
    		</div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>

</div>
  `,
styles: [`

  `]

})
export class ContactCard implements OnInit {
@Input() userchat: any;
@Output() checked = new EventEmitter();
contactOn: boolean = true;
isAuthorized: boolean = false;
contactForm : FormGroup;
user: any;
ms_key: string;
contactMessages: any;
  constructor(
    private _authService: AuthService,
    private _GeolocationService: GeolocationService,
    private _dialog: MdDialog,
    private fb: FormBuilder,
    private _messengerService: MessengerService
    ) {
         
     }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} 
     
    });

     this.contactForm = this.fb.group({
      'message': [null,  Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])]
     });


     this._messengerService.getContactMessages().subscribe(messages => {
      this.contactMessages = messages;
    });
  }
 submitContact(message: any){
    let mid = "ms_"+this.userchat.uid;
    this._messengerService.contact(message, "admin_main", mid);
    this.reset();
  }
  reset (){
    this.contactForm.reset();
  }
 closeChat(){
    this.checked.next(this.user);
  }
  
}

