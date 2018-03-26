import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ModalModule } from 'ngx-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
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
import { SharedService} from './service/shared.service';
import { AuthenticationService} from './service/authentication.service';
import { BookService} from './service/book.service';
import { AlertService } from './service/alert.service';
import { fakeBackendProvider } from './helpers/fake-backend';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';  
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { TextMaskModule } from 'angular2-text-mask';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BooksComponent } from './books/books.component';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchFilterTwoPipe } from './pipe/search-filter-two.pipe';
import { SortByPipe } from './pipe/sort-by.pipe';
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
    BooksComponent,
    SearchFilterPipe,
    ViewOrderComponent,
    ResetPasswordComponent,
    SearchFilterTwoPipe,
    SortByPipe
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    routing,
    TextMaskModule,
    BsDropdownModule.forRoot(),
   BootstrapModalModule.forRoot({container:document.body}),
    ModalModule.forRoot()
  ],
  providers: [AuthenticationService,UserService,AlertService,fakeBackendProvider,BookService, SharedService],
  entryComponents: [ModalConfirmComponent,DeleteModalComponent],
  exports: [SearchFilterPipe,SearchFilterTwoPipe,SortByPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
