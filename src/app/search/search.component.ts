import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { movieData } from 'src/movieRecord/movieData';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchInput!: string;
  movieList:any[]=[];
  constructor(private dataService:DataService, private router:Router, private location:Location){}
 ngOnInit(){
  movieData.forEach(x=>this.movieList.push(x.name))
  this.dataService.isSearch.next(true);
 }
 ngOnDestroy(){
  this.dataService.isSearch.next(false);
 }
 searchResult(event:any){
  const name = event.target.innerText;
  this.router.navigateByUrl(`/details/${name}`)
 }
 routeBack(){
  this.location.back()
}
}
