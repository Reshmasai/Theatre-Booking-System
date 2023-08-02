import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private dataService:DataService){}
   sendLoc(loc:string){
     this.dataService.location.next(loc);
     this.dataService.prevLoc = loc;
   }
  }
 
  

 


