import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'; 

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

 currentUser: User;
 users: User[] = [];
  constructor() {
  this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

   }

  ngOnInit() {
  }

}
