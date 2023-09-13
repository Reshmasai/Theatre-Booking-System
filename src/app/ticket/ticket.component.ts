import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieData } from 'src/movieRecord/movieData';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, OnDestroy {
[x: string]: any;
  title:any;
  certificate:any;
  theatre:any;
  day:any;
  date:any;
  month:any;
  time:any;
  language:any;
  format:any;
  name:any;
  count:any;
  amount:any;
  random:any;
  seatNumList: any[]=[];
  constructor(private activatedRoute:ActivatedRoute, private dataService:DataService){}
  ngOnDestroy(): void {
    this.dataService.isBook.next(false);
  }
  ngOnInit(): void {
    const alpha = "AbcD"
    this.random =Math.floor(Math.random()*1000)+alpha.charAt(Math.floor(Math.random()*alpha.length))+Math.floor(Math.random()*1000)+alpha.charAt(Math.floor(Math.random()*alpha.length));
    this.seatNumList = this.dataService.seatNumList;
    this.dataService.isBook.next(true);
    this.activatedRoute.queryParams.subscribe(x=>{
      this.title = x['title'];
      this.certificate =x['certificate'];
      this.theatre =x['theatre'];
      this.day = x['day'];
      this.date = x['date'];
      this.month = x['month'];
      this.time = x['time'];
      this.language = x['language'];
      this.format = x['format'];  
      this.count = x['count'];
      this.amount =x['amount'];

    })
    movieData.forEach(x=>{if(x.title==this.title){
      this.name = x.name
    }})
    document.querySelector('img')?.setAttribute("src",`assets/Images/${this.name}.jpg`);
  }

}
