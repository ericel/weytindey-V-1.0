import { Injectable} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
@Injectable()
export class NotificationService {
time = 300 ;
  constructor(
    private router: Router,
    private toastr: ToastsManager
  ) {

   }

 failedAttempt(text: string) {
  this.toastr.warning(text, 'Alert!');
  }

  successAttempt(text: string) {
    this.toastr.success(text, 'Alert!');
  }

  errorAttempt(text: string) {
    this.toastr.error(text, 'Alert!');
  }

  countDown(path, id, string) {
    var i = 5;
     var myinterval = setInterval(() => {
        document.getElementById("countdown").innerHTML = "redirecting in: " + i;
        if (i === 0) {
            clearInterval(myinterval );
             this.router.navigate([`${path}/${id}/${this.convertToSlug(string)}`]);
        }
        else {
            i--;
        }
    }, 1000);
 }
  convertToSlug(Text)
    {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }
}
