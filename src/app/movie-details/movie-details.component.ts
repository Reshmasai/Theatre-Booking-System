import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { movieData } from 'src/movieRecord/movieData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class MovieDetailsComponent implements OnInit, AfterViewInit,OnDestroy{
  name:string | undefined;
  title:string | undefined;
  rating:string | undefined;
  time:string | undefined;
  genre:string | undefined;
  certificate:string | undefined;
  date:string | undefined;

  movieDetails = movieData;
  constructor(private activatedRoute:ActivatedRoute, private router:Router){
  }
  ngOnInit(): void {
   this.name= this.activatedRoute.snapshot.paramMap.get('name')!;
   document.querySelector('img')?.setAttribute("src",`assets/Images/${this.name}.jpg`);
   this.movieDetails.forEach(x=>{if(x.name==this.name){
    this.title = x.title, this.rating = x.rating, this.time = x.time,this.genre = x.genre, this.certificate = x.certificate, this.date = x.date
  }})
   console.log(this.name)
  }
  ngAfterViewInit(){
    document.querySelector('body')?.classList.add('change-clr');
  }
  ngOnDestroy(){
    document.querySelector('body')?.classList.remove('change-clr');
  }
  routeOrpopupFn(){
    if(true){
      document.querySelector('.popup')?.classList.add('show');
      document.querySelector('.overlay')?.classList.add('bg-blur');
    }
    // else(){
    //   this.router.navigateByUrl('/book');
    // }
  }
  closePopup(){
    document.querySelector('.popup')?.classList.remove('show');
    document.querySelector('.overlay')?.classList.remove('bg-blur');
  }
}
