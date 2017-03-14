import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-colorcard',
  template: `
  <div class="color-selector">
      <i (click)="showSelector(true)" class="fa fa-tachometer fa-2x" aria-hidden="true"></i>
      <div class="selector row center-xs" *ngIf="isSelectorVisible">
        <div
          class="color"
          *ngFor="let color of colors"
          [ngStyle]="{'background-color': color}"
          (click)="selectColor(color)"
        >
        </div>
      </div>
    </div>
  `,
  styles: [`
 .color-selector {
      position: relative;
    }
    .selector {
      min-width: 150px;
      border: 1px solid lightgrey;
      padding: 10px;
      background-color: #efefef;
      background-color: rgba(68, 82, 111, 0.61);
      position: absolute;
      top: -160px;
      left: 0;
      border-radius: 4px;
      transform: rotate(-20deg);
      z-index: 99;
    }
    .color {
      height: 30px;
      width: 30px;
      border-radius: 100%;
      cursor: pointer;
      margin-right: 10px;
      margin-bottom: 10px;
    }
    .color:hover {
      border: 2px solid darkgrey;
    }
    i {
      font-size: 1.4rem;
      color: grey;
      cursor: pointer;
      color: rgba(68, 82, 111, 0.61);
    }
  `]
})
export class ColorCard implements OnInit {
 @Input() colors: Array<string> = [];
 @Output() selected = new EventEmitter<string>();
 isAuthorized: boolean = false;
 user;
 statusShow: boolean = false;
  constructor(private _authService: AuthService) { }

  ngOnInit() {
     this._authService.userAuth
    .subscribe(value => { 
    if(value){this.isAuthorized = true; this.user = value} 
     else {this.isAuthorized = false} });
  }
  
  toggleStatus() {
     this.statusShow = true;
  }

 isSelectorVisible: boolean = false;

  showSelector(value: boolean) {
    this.isSelectorVisible = value;
  }

  selectColor(color: string) {
    this.showSelector(false);
    this.selected.next(color);
  }
}
