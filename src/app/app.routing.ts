import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { WeatherComponent } from './weather/weather.component';
import { MoviesComponent } from './movies/movies.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BooksComponent } from './books/books.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ParentViewComponent } from './parent-view/parent-view.component';
import { ChildViewComponent } from './child-view/child-view.component';


const indexRoutes: Routes = [
   { path: 'header',component:HeaderComponent, pathMatch: 'full', canActivate: [] },
   { path: 'weather',component:WeatherComponent, pathMatch: 'full', canActivate: [] },
   { path: 'movies',component:MoviesComponent, pathMatch: 'full', canActivate: [] },
   { path: 'login',component:LoginComponent, pathMatch: 'full', canActivate: [] },
   { path: 'register',component:RegisterComponent, pathMatch: 'full', canActivate: [] },

   { path: 'profile',component:UserProfileComponent, pathMatch: 'full', canActivate: [] },

   { path: 'home',component:HomeComponent, pathMatch: 'full', canActivate: [] },
   { path: 'user',component:UserlistComponent, pathMatch: 'full', canActivate: [] },

   { path: 'book',component:BooksComponent, pathMatch: 'full', canActivate: [] },

   { path: 'resetpassword',component:ResetPasswordComponent, pathMatch: 'full', canActivate: [] },

   { path: 'vieworder',component:ViewOrderComponent, pathMatch: 'full', canActivate: [] },

   { path: 'parentview',component:ParentViewComponent, pathMatch: 'full', canActivate: [] },

   { path: 'childview',component:ChildViewComponent, pathMatch: 'full', canActivate: [] },
  // { path: PHMT.ROUTERLINKS.NOACCESS, component: PageNotAuthorizedComponent, pathMatch: 'full', canActivate: []  },
   { path: '**', redirectTo: ''  }
  
  
];

export const routing = RouterModule.forRoot(indexRoutes);