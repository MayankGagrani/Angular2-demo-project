import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service';
import { AlertService } from '../service/alert.service';


export interface registerModel{
  model: Model;
}
export class Model{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
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
  public showPhoneWar:boolean = false; 
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  public mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  

  constructor(private router: Router, private userService: UserService, private alertService: AlertService) { 
    this.model = new Model();
    this.model.firstName = '';
    this.model.lastName = '';
    this.model.email = '';
    this.model.username = '';
    this.model.password  = '';
  }
    //model:any;
  ngOnInit() {
    // this.msg = "Registration successful";

  }

  public register() {
    // this.loading = true;
    let obj = {
      "model" : this.model
    };
    this.userService.create(obj)
        .subscribe(response => {
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

  public validatePhoneNumberLength(event){
    if (event) {
      this.showPhoneWar = true;
      var updatedLength = event.length;
      if (updatedLength == 12 || updatedLength == 0) {
        this.showPhoneWar = false;
      }
    }
    else {
      this.showPhoneWar = false;
    }

  }

}
