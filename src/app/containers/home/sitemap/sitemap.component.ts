import { Component, OnInit } from '@angular/core';
import { StatusService } from '../../../shared/services/status/status.service';

@Component({
  selector: 'app-sitemap',
  templateUrl: './sitemap.component.html',
  styleUrls: ['./sitemap.component.css']
})
export class SitemapComponent implements OnInit {
urls;
  constructor(
    private _statusService: StatusService
  ) {
    
   }

  ngOnInit() {
      this._statusService.getStatus()
    .subscribe(urls => { this.urls = urls;
 });
  }

}
