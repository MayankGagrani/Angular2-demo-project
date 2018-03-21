import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../service/user.service';
import { FormControl, FormGroup, Validators, PatternValidator, NgForm } from '@angular/forms';
import { User } from '../models/user';

export interface userModel{
   model: Model;
 }

 export class Model{
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   id: string;
   password: string;
   phone_number: string;
   sex: string;
   date_of_birth: string;
   oldPassword: string;
   newPassword: string;
   confirmPassword: string;
 }

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [UserService]
})

export class ResetPasswordComponent implements OnInit {
	 public model: Model;
	 currentUser : User;
	 users: User[] = [];
	 public isOldPassword: boolean = false;
	 public isWrongPassword: boolean = false;
	 WrongPasswordMessage: string;

  constructor(private router:Router, private userService: UserService) { 
  	this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  	this.model = new Model();
  	this.model.oldPassword = '';
  	this.model.newPassword = '';
  	this.model.confirmPassword = '';
  }

  ngOnInit() {
  }

  	public resetPassword(form: NgForm)
  	{
  		if (!form.valid) {
			return;
			}
  		this.userService.resetPassword(this.model)
  		.subscribe((response : any) =>
  		{	
  			this.router.navigate(['/login'])
  		},(err)=>{
  				this.isOldPassword = true;
  				this.WrongPasswordMessage = err.split(",")
  		});
  	}

  	public closeErrorAlert(){
      if(this.isOldPassword == true)
      {
        this.isOldPassword = false;
      }
    }
}
