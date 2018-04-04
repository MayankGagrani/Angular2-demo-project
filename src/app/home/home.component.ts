import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user'; 
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
	 currentUser: User;
    users: User[] = [];
    public companion : any;
    public validImage: boolean = false;

  constructor(private userService: UserService) {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    
	}

  ngOnInit() {
      this.companion =
      {
        "image":
        {

        }
      }
  	 this.loadAllUsers();	
  }

     loadAllUsers() {
      this.userService.getAll().subscribe(users => { this.users; });
     }


     public handleInputChange(event)
     {
       this.validImage = false;
       var image = event.target.files[0];
       console.log(image);
       if(!(/(jpeg|jpg|png)$/i).test(image.type))
       {
         this.validImage = true;
         this.companion.image = {}; 
       }
       else
       {
         if(image && !this.validImage)
         {
           this.companion.image.content_type = image.type;
           this.companion.image.file_name = image.name;
           var reader = new FileReader();
           reader.onload = this._handleReaderLoaded.bind(this);
           reader.readAsBinaryString(image);    
         }
       }
     }

      _handleReaderLoaded(readerEvt) {
      var binaryString = readerEvt.target.result;
      this.companion.image.image = btoa(binaryString);
  }

  public closeErrorAlert()
  {
      if(this.validImage == true){
        this.validImage = false;
      }
  }
}
