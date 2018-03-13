import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service';
import { AlertService } from '../service/alert.service';
import { SharedService} from '../service/shared.service';

export interface registerModel{
  model: Model;
}
export class Model{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error;
  public msg:string;
  public showError:boolean= false;
  public model:Model;
  public loading = false;
  //users: any= {};
  

  constructor(private router: Router, private userService: UserService, private alertService: AlertService, private sharedService : SharedService) { 
    this.model = new Model();
    this.model.firstName = '';
    this.model.lastName = '';
    this.model.email = '';
    this.model.username = '';
  }
    //model:any;
  ngOnInit() {
    // this.msg = "Registration successful";
    //this.users = JSON.parse(localStorage.getItem('users'));
    //this.sharedService.setUser("fjdhfjhdj");

  }

  public register() {
    // this.loading = true;
    let obj = {
      "model" : this.model
    };
    this.userService.create(obj)
        .subscribe(response => {
          debugger
          // if(response.success){
                //this.alertService.success('Registration successful', true);
                this.router.navigate(['login']);
              // }    
            },(err) => {
                this.loading = false;
                //this.showError = true;
                //this.alertService.error(error);
                this.error = err.split(",");
            });
	}

  // public closeErrorAlert(){
  // if(this.showError == true)  {
  //     this.showError = false
  //   }
  // }

}
