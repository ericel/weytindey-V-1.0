import { Component, OnInit } from '@angular/core';
import {MdDialog, MdDialogRef, MdSnackBar} from '@angular/material';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
instruct: boolean = true;
choose: boolean = false;
lastDialogResult: string; 
  constructor(
    private _dialog: MdDialog
  ) { }

  ngOnInit() {
    this.countDown();
  }

countDown() {
    var i = 2;
     var myinterval = setInterval(() => {
        //document.getElementById("countdown").innerHTML = ": " + i;
        if (i === 0) {
            clearInterval(myinterval );
             this.instruct = false;
             this.choose = true;
        }
        else {
            i--;
        }
    }, 1000);
 }


}

