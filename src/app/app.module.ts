import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SelectTheatreComponent } from './select-theatre/select-theatre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchComponent } from './search/search.component';
import { MovieSearchPipe } from './movie-search.pipe';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    SeatBookingComponent,
    NavbarComponent,
    MovieDisplayComponent,
    MovieDetailsComponent,
    SelectTheatreComponent,
    SearchComponent,
    MovieSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
