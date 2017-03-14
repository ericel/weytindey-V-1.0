import { Injectable } from '@angular/core';
//import { Note } from './../../store';
import { StoreHelper } from './../store-helper';
import { ApiService } from './../api/api.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Injectable()
export class ListingService {
path: string = 'notes';
  constructor(private storeHelper: StoreHelper, private apiService: ApiService) {}

}