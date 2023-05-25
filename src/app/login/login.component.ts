import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    
  }

  loginForm = new FormGroup({
    email:new FormControl(),
    password:new FormControl()
  })

   onSubmit(login:FormGroup){
    this.http.get<any>("http://localhost:3000/login").subscribe(x=>{
      const value = x.find((y:any)=>{
        return y.email == login.value.email && y.password == login.value.password
      })
      if (value){
        alert('login success')
        this.router.navigateByUrl('/book')
      }
      else{
        alert('No match')
      }
    });
   }
 
  
}
