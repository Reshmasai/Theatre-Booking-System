import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 location = new BehaviorSubject("");
 seatNumList : any[]=[];
 prevLoc:any;
 isBook=new BehaviorSubject(false);
 isSearch=new BehaviorSubject(false);
 isTicket=new BehaviorSubject(false);
 isLoggedIn=new BehaviorSubject(false);
 name = new BehaviorSubject("");
  constructor() { }
}
