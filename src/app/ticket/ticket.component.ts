import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieData } from 'src/movieRecord/movieData';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
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
  constructor(private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
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

    })
    movieData.forEach(x=>{if(x.title==this.title){
      this.name = x.name
    }})
    document.querySelector('img')?.setAttribute("src",`assets/Images/${this.name}.jpg`);
  }

}
