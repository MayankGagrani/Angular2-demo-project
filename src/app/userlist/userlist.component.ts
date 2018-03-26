import { Router } from '@angular/router';
import { Component, TemplateRef, EventEmitter, Inject, Renderer, Input, OnInit, Output, ViewChild, ElementRef,Pipe, PipeTransform} from '@angular/core';
import { User } from '../models/user'; 
import { UserService } from '../service/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DialogService } from "ng2-bootstrap-modal";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpModule } from '@angular/http';
import { ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import { DeleteModalComponent} from '../delete-modal/delete-modal.component';
 
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
   role : string;
 }

 @Pipe({ name: 'SearchFilterTwoPipe'})

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [UserService]
})
export class UserlistComponent implements OnInit {

   public model:Model;
	  currentUser: User[];
    users: User[] = [];
    public modalRef: BsModalRef;
    public showError:boolean = false;
    public deleteMsg:boolean = false; 
    public alertMessage: string;
    //public searchInput:any ='';
    public mask = [/[1-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]   

  @ViewChild('updateModal') public updateModal: ModalDirective;
  constructor( private router: Router, private userService: UserService, private modalService: BsModalService, private dialogService: DialogService) { 
  	this.users = JSON.parse(localStorage.getItem('users'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model = new Model();
    //this.ufirstname = this.sharedService.getUser();
     this.model.firstName = '';
     this.model.lastName = '';
     this.model.email = '';
     this.model.username = '';
     this.model.id = '';
     this.model.password = '';
     this.model.sex = '';
     this.model.date_of_birth = '';
     this.model.phone_number = '';
     this.model.role = 'admin';
  }

  ngOnInit() {
  }

  openModal(user){
    this.model.firstName = user.firstName;
    this.model.lastName = user.lastName;
    this.model.username = user.username;
    this.model.email = user.email;
    this.model.id = user.id;
    this.model.password = user.password;
    this.model.sex = user.sex;
    this.model.date_of_birth = user.date_of_birth;
    this.model.phone_number = user.phone_number;
    this.model.role = user.role;
    this.updateModal.show();
    }

   deleteUser(user,currentUser) {
    this.dialogService.addDialog(ModalConfirmComponent, {
      title: 'Are you sure you want to delete the user?',
      message: 'User Name: '+ user.firstName + ' ' + user.lastName + ' ' +  
               'Id: '+ user.id
    })
    .subscribe((isConfirmed)=> {
     if(isConfirmed){  
        this.userService.delete(user.id,currentUser)
          .subscribe((response :any) => {
            this.showConfirm(user);
            this.users = response;
          },(err) => {
                this.deleteMsg = true;
                this.alertMessage = err.split(",");

        });
      }
    });
  }

    updateUser(model) {
      let obj = {
      "model" : this.model
    };
    this.userService.update(model)
      .subscribe((response:any) => {
          this.updateModal.hide();
          this.users = response;
      });
     }  

    onCloseHandled(){
      this.updateModal.hide();
    }

    public showConfirm(user)
    {
      this.dialogService.addDialog(DeleteModalComponent,{
        title: 'User has been deleted successfully',
           message: 'User Name: '+ user.firstName + ' ' + user.lastName 
      })
      .subscribe((isConfirmed) => {
          this.router.navigate(['home'])
        });

    }

    public closeErrorAlert(){
      if(this.deleteMsg == true)
      {
        this.deleteMsg = false;
      }
    }
}
