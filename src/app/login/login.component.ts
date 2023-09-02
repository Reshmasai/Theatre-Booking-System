import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  name:any;
  constructor(private http:HttpClient, private router:Router, private dataService:DataService){}
  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

   onSubmit(login:FormGroup){
    this.http.get<any>("http://localhost:3000/login").subscribe(x=>{
      const value = x.find((y:any)=>{
        this.name= y.name
        return y.email == login.value.email && y.password == login.value.password
      })
      if (value){
        this.dataService.isLoggedIn.next(true);
        this.dataService.name.next(this.name);
        this.router.navigateByUrl('');
      }
      else{
        alert('No match')
      }
    });
   }
 
  
}
