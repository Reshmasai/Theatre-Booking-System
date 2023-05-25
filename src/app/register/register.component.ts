import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private http:HttpClient, private router:Router){}
  RegistrationForm = new FormGroup({
    email:new FormControl(),
    password:new FormControl(),
    username:new FormControl()
  })

  onRegister(register:FormGroup){
    console.log(register.value)
    if(register.value!==undefined && register.value!==null){
      this.http.post<any>("http://localhost:3000/login", register.value).subscribe(x=>{
      alert("data added");
      register.reset();
      this.router.navigateByUrl('/')
    })
    }
  }
}
