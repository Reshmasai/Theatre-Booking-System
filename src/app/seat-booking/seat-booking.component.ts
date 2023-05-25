import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css']
})
export class SeatBookingComponent implements OnInit{
  local1:any;
  local2: any;
ngOnInit(): void {
  this.getFromLocal();
}
cost:number=100;
count:number=0;
amount:number=0;
disabled:any[]=[];
indexArray:any[]=[];
disabledIndex:any[]=[];
selected:any[]=[];

fn(event:any){
  event.target.classList.toggle('selected');
  this.updateCount();
}
getFromLocal(){
  const seats = document.querySelectorAll('.seat');
  this.local1=localStorage.getItem('selectedSeats')
  this.local2=localStorage.getItem('disabledSeats')
  if((this.local1 && this.local2)!==null || (this.local1 && this.local2)!==undefined){
    this.selected= JSON.parse(this.local1);
    this.disabled= JSON.parse(this.local2);
    seats.forEach(x=>{
      console.log(x.id)
     if(this.selected.includes(x.id)){
          x.classList.add('selected');
     }
     if(this.disabled.includes(x.id)){
        x.classList.add('disabled')
     }
    })
  }
}
updateCount(){
  const selectedSeats =document.querySelectorAll('.seat.selected');
  const disabledSeats = document.querySelectorAll('.seat.disabled')
  selectedSeats.forEach(x=>{
    this.indexArray.push(x.id)
  })
  disabledSeats.forEach(x=>{
    this.disabledIndex.push(x.id)
  })
  localStorage.setItem('selectedSeats',JSON.stringify(this.indexArray));
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
}
