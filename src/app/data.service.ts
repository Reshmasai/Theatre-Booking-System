import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 location = new Subject();
 prevLoc:any;
 isBook=new BehaviorSubject(false);
 isSearch=new BehaviorSubject(false);
  constructor() { }
}
