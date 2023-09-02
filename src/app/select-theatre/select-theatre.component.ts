import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  priceFilteredList:any[]=[];
  timeFilteredList:any[]=[];
  timings:any;
  nativeArray:any[]=[];
  futureDate:any[]=[];
  futureMonth:any[]=[];
  futureDay:any[]=[];
  checkedItems:any[]=[];
  allItems:any[]=[];
  rangeList:any[]=[];
  timeList:any[]=[];
  filteredTimingList:any[]=[[],[],[],[]];
  filteredMovieList:any[]=[];
  originalMovieList:any[]=[];
  originalTimingList:any[]=[];
  isPriceFiltered:boolean = false;
  isTimeFiltered:boolean = false;
  isLangFiltered:boolean = false;
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
openLanguage(){
  document.querySelector('.language')?.classList.toggle('display');
  document.querySelector('.down-arrow-2')?.classList.toggle('rotate-arrow');
}
closeLanguage(){
  if(document.querySelector('.language')?.classList.contains('display')) {
    document.querySelector('.language')?.classList.toggle('display');
    document.querySelector('.down-arrow-2')?.classList.toggle('rotate-arrow');
  }
  if(document.querySelector('.pricings')?.classList.contains('display')) {
    document.querySelector('.pricings')?.classList.toggle('display');
    document.querySelector('.down-arrow-1')?.classList.toggle('rotate-arrow');
  }
  if(document.querySelector('.timings')?.classList.contains('display')) {
    document.querySelector('.timings')?.classList.toggle('display');
    document.querySelector('.down-arrow')?.classList.toggle('rotate-arrow');
  }
}
@HostListener('click', ['$event']) fnc(event:any){

  if(event.target.nodeName=='INPUT')
  {
    this.priceFilteredList = [];
    this.timeFilteredList= [];
    this.filteredMovieList = [];
    this.filteredTimingList= [[],[],[],[]];
    this.isPriceFiltered = false;
    this.isTimeFiltered = false;
    this.rangeList = [];
    this.timeList = [];
    this.checkedItems.push(event.target)
    this.allItems = [...new Set(this.checkedItems)]
    this.allItems.forEach(x=>
      {
        if(!x.checked) {
          this.checkedItems.splice(this.checkedItems.indexOf(x),1);
        }
        else if(isNaN(parseInt(x.nextSibling.innerText.split('-')))){
          this.timeList.push(x.nextSibling.innerText)
          console.log(this.timeList)
        }
        else {
          this.rangeList.push(x.nextSibling.innerText.split('-'));
          console.log(this.rangeList)
        }
        
      }
    )
    this.rangeList.forEach((x:any)=>{
      this.priceRange.forEach(y=>{
        if(parseInt(x[0])<=parseInt(y.normal)){
          this.isPriceFiltered = true;
          const yIndex = this.priceRange.indexOf(y);
          this.priceFilteredList.push(this.theatre[yIndex])
          this.timeFilteredList.push(this.timings[yIndex])
          this.priceFilteredList =[...new Set(this.priceFilteredList)] 
        }
      })
    })

    this.timeList.forEach((x:string)=>{
      this.timings.forEach((y:any) => {
        const ind= parseInt(this.timings.indexOf(y));
        y.forEach((z:any)=>{     
          const splittedTime = z.split(/[:" "]/)
          if (splittedTime[2]=="AM" && (x=="Night" || x=="Morning")){
            this.isTimeFiltered = true;
            if((splittedTime[0]=="12" || parseInt(splittedTime[0])<4) && x=="Night"){
              this.storeFilteredValues(ind,z);
            }
            if((splittedTime[0]=="04" || (parseInt(splittedTime[0])>4 && parseInt(splittedTime[0])<=11)) && x=="Morning"){
              this.storeFilteredValues(ind,z);
            }
          }
          if(splittedTime[2]=="PM" && (x=="Afternoon" || x=="Evening")){
            this.isTimeFiltered = true;
            if((splittedTime[0]=="12" || parseInt(splittedTime[0])<4) && x=="Afternoon"){
              this.storeFilteredValues(ind,z);
            }
            if((splittedTime[0]=="04" || (parseInt(splittedTime[0])>4 && parseInt(splittedTime[0])<=11)) && x=="Evening"){
              this.storeFilteredValues(ind,z);
            }
          }
        })
      });
    })
    
    const filterReplica=[...this.filteredMovieList]
    filterReplica.forEach(x=>{
      const replicaInd=filterReplica.indexOf(x)
      if((!this.priceFilteredList.includes(x)) && this.priceFilteredList.length){
        this.filteredTimingList.splice(this.filteredMovieList.indexOf(x),1)
        this.filteredMovieList.splice(this.filteredMovieList.indexOf(x),1)
      }
    })
    if(!this.isPriceFiltered && this.isTimeFiltered){
      this.makeOriginalList();
    }
    else if (this.isPriceFiltered && !this.isTimeFiltered){
      this.originalMovieList = [...this.priceFilteredList]
      this.originalTimingList= this.timeFilteredList.filter(x=>x.length);
    }
    else {
      this.makeOriginalList();
    }
  }
  else if(event.target.nodeName == 'P' && event.target.parentElement.attributes[1].nodeValue == "lang") {
    this.language = event.target.textContent.split(" ")[0];
    this.format = event.target.textContent.split(" ")[1];
    this.isLangFiltered = true;
  }
}
storeFilteredValues(ind:any,z:any){
  this.filteredTimingList[ind].push(z)
  if(!(this.filteredMovieList.includes(this.theatre[ind]))) {
    this.filteredMovieList.push(this.theatre[ind])
  }
}
makeOriginalList(){
  this.originalMovieList = [...this.filteredMovieList]
  this.originalTimingList= this.filteredTimingList.filter(x=>x.length);
}

}
