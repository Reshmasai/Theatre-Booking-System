import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { movieData } from 'src/movieRecord/movieData';
import { Subscription } from 'rxjs';
import { browserRefresh } from '../app.component';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements AfterViewInit, OnInit, OnDestroy{
  local1:any;
  local2: any;
  isBook:boolean = false;
  cost:number=100;
  count:number=0;
  amount:number=0;
  disabled:any[]=[];
  indexArray:any[]=[];
  newArray:any[]=[];
  disabledIndex:any[]=[];
  selected:any[]=[];
  title:any;
  certificate:any;
  theatre:any;
  day:any;
  date:any;
  month:any;
  time:any;
  mveIndex:any;
  priceRange:any;
  movieRates:any;
  priceVip:any;
  pricePremium:any;
  priceExecutive:any;
  priceNormal:any;
  sumVip = 0;
  sumPremium = 0;
  sumExecutive = 0;
  sumNormal = 0;

  timeList:any[]=[];
  selectedItems:any[]=[];
  subscription:Subscription | undefined;
  constructor(private dataService:DataService, private activatedRoute:ActivatedRoute, private location:Location, private router:Router){
  
  }
  ngOnDestroy(): void {
    this.dataService.isBook.next(false)  
  }
  ngOnInit(): void {
    this.dataService.isBook.next(true);
    this.activatedRoute.queryParams.subscribe(x=>{
      this.title = x['title'];
      this.certificate =x['certificate'];
      this.theatre =x['theatre'];
      this.day = x['day'];
      this.date = x['date'];
      this.month = x['month'];
      this.time = x['time'];
      this.timeList = x['timeList'].split(',');
      this.mveIndex = x['index'];
      
    })
    movieData.forEach(x=>{if(x.title==this.title){
      this.priceRange = x.priceRange;
      this.movieRates = this.priceRange[this.mveIndex];
      this.priceVip = this.movieRates.VIP;
      this.pricePremium = this.movieRates.premium;
      this.priceExecutive = this.movieRates.executive;
      this.priceNormal = this.movieRates.normal;
      console.log(this.priceRange[this.mveIndex])

        console.log(this.priceRange[this.mveIndex].normal,this.priceRange[this.mveIndex].executive,this.priceRange[this.mveIndex].premium )
    }
  })
  if(browserRefresh){
    this.location.back();
  }
  }
  
  

  ngAfterViewInit(): void {
    this.getFromLocal();
    const el = document.getElementsByClassName('time-items');
    for(let i=0; i<el.length;i++){
      if(this.time.trim() == el[i].innerHTML.trim()){
        el[i].classList.add('time-selected')
        this.selectedItems.push(el[i]);
      }
    }
  }

fn(event:any,str:any){
  event.target.classList.toggle('selected');
  if(event.target.classList.contains('selected')){
    console.log("i'm selected")
    if(str=="VIP"){
      this.sumVip = this.sumVip + parseInt(this.priceVip);
    }
    else if (str=="premium"){
      this.sumPremium =this.sumPremium + parseInt(this.pricePremium);
    }
    else if (str=="executive"){
      this.sumExecutive = this.sumExecutive + parseInt(this.priceExecutive);
    }
    else if (str=="normal"){
      this.sumNormal = this.sumNormal + parseInt(this.priceNormal);
    }
    console.log(this.sumExecutive,this.sumNormal,this.sumPremium,this.sumVip)
  }
  else {
    console.log("i'm unselected")
    if(str=="VIP"){
      this.sumVip = this.sumVip - parseInt(this.priceVip);
    }
    else if (str=="premium"){
      this.sumPremium =this.sumPremium - parseInt(this.pricePremium);
    }
    else if (str=="executive"){
      this.sumExecutive = this.sumExecutive - parseInt(this.priceExecutive);
    }
    else if (str=="normal"){
      this.sumNormal = this.sumNormal - parseInt(this.priceNormal);
    }
    console.log(this.sumExecutive,this.sumNormal,this.sumPremium,this.sumVip)
  }
  this.updateCount();
  console.log(event.target)
}
getFromLocal(){
  const seats = document.querySelectorAll('.seat');
  //this.local1=localStorage.getItem('selectedSeats');
  this.local2=localStorage.getItem('disabledSeats');
  if( this.local2!==null || this.local2!==undefined){
    //this.selected= JSON.parse(this.local1);
    this.disabled= JSON.parse(this.local2);
    seats.forEach(x=>{
    //  if(this.selected.includes(x.id)){
    //       x.classList.add('selected');
    //  }
     if(this.disabled.includes(x.id)){
        x.classList.add('disabled')
     }
    })
  }
  this.bookSeatsVisibility(this.selected);
}
updateCount(){
  const selectedSeats =document.querySelectorAll('.seat.selected');
  const disabledSeats = document.querySelectorAll('.seat.disabled');
  this.bookSeatsVisibility(selectedSeats);
  // selectedSeats.forEach(x=>{
  //   this.indexArray.push(x.id)
  // })
  disabledSeats.forEach(x=>{
    this.disabledIndex.push(x.id)
  })
  //localStorage.setItem('selectedSeats', JSON.stringify(this.indexArray));
  localStorage.setItem('disabledSeats',JSON.stringify(this.disabledIndex));
  const seatCount= selectedSeats.length;
  this.count = seatCount;
  this.amount = seatCount*this.cost;
  this.indexArray=[]
}
bookSeats(){
  const selectedSeats =document.querySelectorAll('.seat.selected');
  selectedSeats.forEach(x=>{
    x.classList.remove('selected');
    x.classList.add('disabled')
    this.updateCount();
  })
}
bookSeatsVisibility(reqSeats:any){
  if(reqSeats.length){
    this.isBook = true;
  }
  else {
    this.isBook=false;
  }
}
routeBack(){
  this.location.back()
}
selectTime(event:any){
  this.selectedItems.forEach(x=>{x.classList.remove('time-selected')})
  event.target.classList.add('time-selected')
  this.time = event.target.innerHTML;
  this.selectedItems.push(event.target)
}
}


