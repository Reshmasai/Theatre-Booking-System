import { Component } from '@angular/core';
import { DataService } from './data.service';
import { NavigationStart, Router} from '@angular/router';
import { Subscription } from 'rxjs';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isBook: any;
  isSearch: any;
  isTicket: any;
  subscription:Subscription | undefined;
  constructor(private dataService:DataService, private router:Router ){
    this.dataService.isBook.subscribe(x=>this.isBook = x);
    this.dataService.isSearch.subscribe(x=>this.isSearch = x);
    this.dataService.isTicket.subscribe(x=>this.isSearch = x);

    this.subscription = router.events.subscribe(event=>{
      if(event instanceof NavigationStart){
        browserRefresh = !router.navigated;
      }
    })
  }
  title = 'Test';
}
