import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  isLoggedIn:any;
  name:any;
  constructor(private dataService:DataService){}
  ngOnInit(): void {
    this.dataService.isLoggedIn.subscribe(x=>{
      this.isLoggedIn = x;
    })
    this.dataService.name.subscribe((x:any)=>{
      this.name =x;
      console.log(this.name)
    })
  }
  
   sendLoc(loc:string){
     this.dataService.location.next(loc);
     this.dataService.prevLoc = loc;
   }
  }
 
  

 


