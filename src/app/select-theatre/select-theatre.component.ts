import {  Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { movieData } from 'src/movieRecord/movieData';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { faBurger, faWineGlassEmpty } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
@Component({
  selector: 'app-select-theatre',
  templateUrl: './select-theatre.component.html',
  styleUrls: ['./select-theatre.component.css']
})
export class SelectTheatreComponent {
  burger= faBurger;
  beverage = faWineGlassEmpty;
  movieDetails = movieData;
  name:string | undefined;
  language:string | undefined;
  format:string | undefined;
  title:string | undefined;
  rating:string | undefined;
  time:string | undefined;
  genre:string | undefined;
  certificate:string | undefined;
  date:string | undefined;
  seperateGenre:any;
  currentDate:any;
  targetDate:any;
  index:any;
  dateIndex:any;
  currentLoc:any;
  prevLoc:any;
  theatre:any[]=[];
  theatreList:any[]=[];
  priceRange:any[]=[];
  priceList:any[]=[];
  timings:any;
  nativeArray:any[]=[];
  futureDate:any[]=[];
  futureMonth:any[]=[];
  futureDay:any[]=[];
  checkedItems:any[]=[];
  allItems:any[]=[];
  rangeList:any[]=[];
  selectedEl:any;


  @ViewChild('scroll') scroll!: ElementRef;
  @ViewChild('datePick') datePick!: ElementRef;

  constructor(private activatedRoute:ActivatedRoute, private dataService:DataService, private location:Location, private router:Router){
  }

  ngOnInit(): void {
   this.name= this.activatedRoute.snapshot.paramMap.get('name')!;
   this.language= this.activatedRoute.snapshot.paramMap.get('language')!;
   this.format= this.activatedRoute.snapshot.paramMap.get('format')!;
   this.movieDetails.forEach(x=>{if(x.name==this.name){
    this.title = x.title, this.rating = x.rating, this.time = x.time,this.genre = x.genre, this.certificate = x.certificate, this.date = x.date,
    this.currentLoc=x.Location, this.theatreList=x.theatre, this.timings = x.timings, this.priceRange= x.priceRange
  }})
    this.dataService.location.subscribe(x=>{
      this.index = this.currentLoc.indexOf(x);
      this.theatre= this.theatreList[this.index];
    });
   this.prevLoc= this.dataService.prevLoc;
   this.index = this.currentLoc.indexOf(this.prevLoc);
   this.theatre= this.theatreList[this.index];
   this.priceList = this.priceRange[this.index]
   this.seperateGenre = this.genre?.split(',');
   this.currentDate = new Date().toDateString().split(' ');
   this.currentDate.pop();
   this.targetDate = new Date();
   for(let i=0; i<=6; i++){
    this.targetDate.setDate(new Date().getDate()+i);
    const adjustedDate= this.targetDate.toDateString().split(' ');
    adjustedDate.pop();
    this.futureDay.push(adjustedDate[0]);
    this.futureMonth.push(adjustedDate[1]);
    this.futureDate.push(adjustedDate[2]);
   } 
}
ngAfterViewInit(){
  const el = document.querySelector('.date-holder');
  el?.classList.add('date-holder-active');
  this.selectedEl =el;
}
scrollLeft(){
  this.scroll.nativeElement.scrollLeft -= 150;
}
scrollRight(){
   this.scroll.nativeElement.scrollLeft += 150;

}
fn(event:any,index:any){
  this.selectedEl.classList.remove('date-holder-active')
  const val= event.currentTarget;
  this.dateIndex = index;
  this.nativeArray.push(val)
  this.nativeArray.forEach(x=>{
    x.classList.remove('date-holder-active')
  })
  val.classList.add('date-holder-active');
}
goBack(){
  this.location.back();
}
navigateToBooking(time:any,timeList:any,theatreName:any){
  const mveIdx = this.theatre.indexOf(theatreName);
  this.router.navigate(
    ['/book'], 
    { queryParams: {
      title:`${this.title}`,
      certificate:`${this.certificate}`,
      date:`${this.futureDate[this.dateIndex]}`,
      day:`${this.futureDay[this.dateIndex]}`,
      month:`${this.futureMonth[this.dateIndex]}`,
      time:`${time}`,
      timeList:`${timeList}`,
      theatre:`${theatreName}`,
      index:`${mveIdx}`

    }
  }
  )
}
openPricing(){
 document.querySelector('.pricings')?.classList.toggle('display');
 document.querySelector('.down-arrow-1')?.classList.toggle('rotate-arrow');
}
openTiming(){
  document.querySelector('.timings')?.classList.toggle('display');
  document.querySelector('.down-arrow')?.classList.toggle('rotate-arrow');
}
@HostListener('click', ['$event']) fnc(event:any){
  
  if(event.target.nodeName=='INPUT')
  {
    this.rangeList = []
    this.checkedItems.push(event.target)
    this.allItems = [...new Set(this.checkedItems)]
    this.allItems.forEach(x=>
      {
        if(!x.checked) {
          this.checkedItems.splice(this.checkedItems.indexOf(x),1);
        }
        else{
          this.rangeList.push(x.nextSibling.innerText.split('-'));
        }
      }
    )
    this.rangeList.forEach(x=>{
      if(x=="0-100"){

      }
    })
  }
}
openLanguage(){

}

}
