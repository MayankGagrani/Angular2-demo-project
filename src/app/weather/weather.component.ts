import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // public keyDownPatientForm(form,event){
  //   if(event.keyCode == 13) {
  //     this.submitPost(form);
  //   }
  // }

}
