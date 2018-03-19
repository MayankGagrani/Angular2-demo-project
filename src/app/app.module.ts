import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ModalModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
//import { BsModalModule } from 'ng2-bs3-modal';
import { RouterModule, Routes } from '@angular/router';
import { routing }        from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService} from './service/user.service';
import { AuthenticationService} from './service/authentication.service';
import { SharedService} from './service/shared.service';
import { AlertService } from './service/alert.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { TextMaskModule } from 'angular2-text-mask';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BooksComponent } from './books/books.component';
//import { MoviesService} from './movies.service'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    MoviesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserlistComponent,
    ModalConfirmComponent,
    DeleteModalComponent,
    UserProfileComponent,
    BooksComponent
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    routing,
    TextMaskModule,
    //BrowserAnimationsModule,
    //BsModalModule,
   BootstrapModalModule.forRoot({container:document.body}),
    ModalModule.forRoot()
  ],
  providers: [AuthenticationService,UserService,AlertService,fakeBackendProvider,SharedService],
  entryComponents: [ModalConfirmComponent,DeleteModalComponent],
  //exports: [ModalConfirmComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
