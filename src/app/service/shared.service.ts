import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient} from '@angular/common/http';

@Injectable()
export class SharedService {
	 private firstname: string;
	 private lastname: string;
	 private username: string;
	 private email; string;

  constructor() { 
  	this.firstname ;
  	this.lastname;
  	this.username;
  	this.email;
  }

   public setUser(val: any): void {
        this.firstname = val;
    }

    public getUser(): string {
    	return this.firstname;	

    }

}
