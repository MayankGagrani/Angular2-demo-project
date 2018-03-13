import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  	// public keyDownPatientForm(form,event){
   //  if(event.keyCode == 13) {
   //    this.submitPost(form);
   // 		 }
  	// }
}
