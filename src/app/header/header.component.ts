import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../models/user';
import { BsDropdownModule } from 'ngx-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
	currentUser: User;
    users: User[] = [];

  constructor(private router: Router) { 
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  	
  }

  ngOnInit() {

  }

}
