import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService} from '../service/authentication.service';
import { AlertService } from '../service/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	model: any = {};
	loading = false;
	public logError = false;
	returnUrl: string;
	public loginError;


  constructor(private router: Router, private route: ActivatedRoute,private authenticationService: AuthenticationService, private alertService: AlertService) { }

  ngOnInit() {
  	 // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

 public login() {
	  this.loading = true;
	  this.authenticationService.login(this.model.email, this.model.password)
	      .subscribe(
	          data => {
	              this.router.navigate(['/home']);
	          },
	          error => {  		
	              //this.alertService.error(error);
	              this.loading = false;
	              this.logError = true; 
	              this.loginError = error.split(",");
	          });
	}

	public closeErrorAlert(){
  	if(this.logError == true)  {
      this.logError = false
    }
  }

}
