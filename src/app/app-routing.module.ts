import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'book',component:SeatBookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
