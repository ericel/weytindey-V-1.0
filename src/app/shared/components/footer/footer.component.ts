import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { MessengerService } from '../../services/messenger/messenger.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
contactOn: boolean = false;
contactForm : FormGroup;
isAuthorized: boolean = false;
user: any; ms_key: string;
contactMessages;
nomessages: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private _messengerService: MessengerService
  ) { }

  ngOnInit() {
     this.contactForm = this.fb.group({
      'message': [null,  Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(500)])]
     });

      this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} 
     this.ms_key = "ms_" + value.uid;
    });

  }
  
  contactShow(){
    this.contactOn = true;
    this._messengerService.getContactMessages().subscribe(messages => {
      this.contactMessages = messages;
      if(this.contactMessages.length < 1){
        this.nomessages = true;
      }
    });
  }
  closeChat(){
    this.contactOn = false;
  }

  submitContact(message: any){
    this._messengerService.contact(message);
    this.reset();
  }
  reset (){
    this.contactForm.reset();
  }
}
