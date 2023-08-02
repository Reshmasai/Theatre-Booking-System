import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.css']
})
export class MovieDisplayComponent {
  constructor(private router:Router){}
  isLeft:boolean=false;
  isRight:boolean=true;
  @ViewChild('scroll') scroll!: ElementRef;
  scrollLeft(){
     this.scroll.nativeElement.scrollLeft -= 150;
     this.isRight = true;
     this.isLeft = false;
  }
  scrollRight(){
      this.scroll.nativeElement.scrollLeft += 150;
      this.isLeft=true;
      this.isRight=false;
  }
  @HostListener('click', ['$event']) onClick(event:any){
    if(event.target.nodeName=='IMG')
    {
      const name= event.target.src.split("/").pop().split(".").shift();
      this.router.navigateByUrl(`/details/${name}`)
    }
  }
  // routeToDetails(event:any){
  //   console.log()
  // }
}
