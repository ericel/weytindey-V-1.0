import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgModel } from '@angular/forms';
import { MediaService } from '../../../shared/services/media/media.service';
import { NotificationService } from './../../../shared/services/notification/notification.service';
import { Md5 } from 'ts-md5/dist/md5';
import * as firebase from 'firebase';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
submitted = false;
uploadForm : FormGroup;
 uploading: boolean = false;
 isAuthorized: boolean = false;
 user; storageRef; token;
 upload_KEY: string = 'upload_file';
 file_name;file_ext;
 uploadedUrl;file_type;
 uploaded: boolean = false;
uploadvalue: number;
   countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bangladesh', 'Barbados', 'Bahamas', 'Bahrain', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'British Indian Ocean Territory', 'British Virgin Islands', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burma', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo-Brazzaville', 'Congo-Kinshasa', 'Cook Islands', 'Costa Rica', 'Croatia', 'Curaçao', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'El Salvador', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Federated States of Micronesia', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Lands', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard and McDonald Islands', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn Islands', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Barthélemy', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin', 'Saint Pierre and Miquelon', 'Saint Vincent', 'Samoa', 'San Marino', 'São Tomé and Príncipe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Swaziland', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Vietnam', 'Venezuela', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];
  constructor(
    private _mediaService: MediaService,
    private fb: FormBuilder,
    private _notify: NotificationService
  ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      'uploadType': [null,  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'uploadCountry': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'uploadName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
    });
  }
upload() {
 this.token = Md5.hashStr(new Date() + 'hehehe');
     window.localStorage.setItem(this.upload_KEY, this.token);
     this.storageRef = firebase.storage().ref().child(`eAudio/${this.token}`);
      this.uploading = true;
        let selectedFile = (<HTMLInputElement>document.getElementById('file-b')).files[0];
        const uploadedFile = (<HTMLInputElement>document.getElementById('file-b')).value;
        if (uploadedFile) {
            var startIndex = (uploadedFile.indexOf('\\') >= 0 ? uploadedFile.lastIndexOf('\\') : uploadedFile.lastIndexOf('/'));
            var filename = uploadedFile.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
                this.file_name = filename.substring(0, filename.lastIndexOf('.'));
                this.file_ext = filename.split('.').pop();
                this.file_type = selectedFile.type
            }
          
        }
       this.storageRef.put(selectedFile).then(snapshot => {
         this.uploadvalue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.storageRef.getDownloadURL().then(url => {
            this.uploadedUrl = url;
          });

           if(this.uploadvalue === 100){
              this.uploading = false;
              this.uploaded = true;
            }
        });
        
    }
uploadfile(upload: any){
  const token = window.localStorage.getItem(this.upload_KEY);
    this._mediaService.addMuisc(upload, token, this.uploadedUrl, this.file_ext, this.file_type);
    this.submitted = true;
    let path = '/music/audio';
    //this._notify.countDown(path, token, upload.uploadName);
    this.reset();
  }

reset (){
    this.uploadForm.reset();
    this.uploaded = false;
  }
}
