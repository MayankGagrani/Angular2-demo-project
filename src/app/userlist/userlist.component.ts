// import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Component, TemplateRef, EventEmitter, Inject, Renderer, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import { User } from '../models/user'; 
import { UserService } from '../service/user.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DialogService } from "ng2-bootstrap-modal";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { HttpModule } from '@angular/http';
import { SharedService} from '../service/shared.service';
import { ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';

 export interface userModel{
   model: Model;
 }

 export class Model{
   firstName: string;
   lastName: string;
   email: string;
   username: string;
   id: string;

 }

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [UserService]
})
export class UserlistComponent implements OnInit {

   public model:Model;
	  currentUser: User;
    users: User[] = [];
    //user: any = {};
    //model:any= {};
    public modalRef: BsModalRef;
    public showError:boolean = false;
    public ufirstname: string;    

  @ViewChild('updateModal') public updateModal: ModalDirective;
  constructor( private router: Router, private userService: UserService, private modalService: BsModalService, private dialogService: DialogService,private sharedService : SharedService ) { 
  	this.users = JSON.parse(localStorage.getItem('users'));
    //this.user;
    this.model = new Model();
    //this.ufirstname = this.sharedService.getUser();
     this.model.firstName = '';
     this.model.lastName = '';
     this.model.email = '';
     this.model.username = '';
     this.model.id = '';
    //this.router.navigate(['/register,this.user.id']);
  }

  ngOnInit() {
  }

  openModal(user){
    this.model.firstName = user.firstName;
    this.model.lastName = user.lastName;
    this.model.username = user.username;
    this.model.email = user.email;
    this.model.id = user.id;
    this.updateModal.show();
    }

   deleteUser(user) {
    this.dialogService.addDialog(ModalConfirmComponent, {
      title: 'Are you sure you want to delete the user?',
      message: 'User Name: '+ user.firstName + ' ' + user.lastName
    })
    .subscribe((isConfirmed)=> {
     if(isConfirmed){  
        this.userService.delete(user.id)
          .subscribe(response => {
                 this.router.navigate[('/user')];
        
          });
      }
    });
  }

    updateUser(model) {
      debugger
      let obj = {
      "model" : this.model
    };
    this.userService.update(model)
      .subscribe(response => 
          { this.users;});
     }  

    onCloseHandled(){
      this.updateModal.hide();
    }
}
