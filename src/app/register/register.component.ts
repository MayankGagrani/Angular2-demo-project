import { Component, OnInit,Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../service/user.service';
import { AlertService } from '../service/alert.service';
import { FormControl, FormGroup, Validators, PatternValidator, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';


export interface registerModel{
  model: Model;
}
export class Model{
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  sex : boolean;
  date_of_birth:string;
  phone_number: number;
  role: string;
}

@Pipe({ name: 'DatePipe'})

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe]
})
export class RegisterComponent implements OnInit {

  public error;
  public msg:string;
  public showError:boolean= false;
  public model:Model;
  public loading = false;
  public guide: boolean = false;
  public showPhoneWar:boolean = false; 
  public date_of_birth: string = '2016/12/25';
  public mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
  public date: string;
  

  constructor(private router: Router, private userService: UserService, private alertService: AlertService, private datePipe : DatePipe) { 
    this.model = new Model();
    this.model.firstName = '';
    this.model.lastName = '';
    this.model.email = '';
    this.model.username = '';
    this.model.password  = '';
    this.model.sex = null;
    this.model.date_of_birth = '';
    this.model.phone_number = null;
    this.model.role = 'admin';
  }
  ngOnInit() {
    // this.msg = "Registration successful";
    this.date = this.datePipe.transform(new Date(), 'dd/mm/yyyy');

  }

  public register(form : NgForm) {
    if (!form.valid) {
      return;
    }
    if(this.showPhoneWar){
      return;
    }
    this.loading = true;
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
  
  public omit_special_char(event)
  {
    var regex = new RegExp("^[a-zA-Z_ ]+|[\b]*$");
    var key = String.fromCharCode(!event.charCode ? event.which: event.charCode )
    if(!regex.test(key)){
      event.preventDefault();
      return false;
    }
  }

}
