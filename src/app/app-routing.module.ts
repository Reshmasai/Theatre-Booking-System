import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { SelectTheatreComponent } from './select-theatre/select-theatre.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:'navbar',component:NavbarComponent},
  {path:'login',component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'', component:MovieDisplayComponent},
  {path:'details/:name', component:MovieDetailsComponent},
  {path:'book',component:SeatBookingComponent},
  {path:'theatre/:name/:language/:format',component:SelectTheatreComponent},
  {path:'search' , component:SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
