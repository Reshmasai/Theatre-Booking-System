import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movieSearch'
})
export class MovieSearchPipe implements PipeTransform {
  newList:any[]=[];
  transform(movieList: string[], searchInput: string): any[]  {
    searchInput=searchInput.toLowerCase();
    if(searchInput){
      this.newList=movieList.filter(x=>x.toLowerCase().includes(searchInput));
      console.log(this.newList)
      if(searchInput && !this.newList[0]){
        return ["No results found"]
      }
      else return this.newList
    }
    else return []
 
    
  }

}
