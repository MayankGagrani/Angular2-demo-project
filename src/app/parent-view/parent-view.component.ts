import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent-view',
  templateUrl: './parent-view.component.html',
  styleUrls: ['./parent-view.component.css']
})
export class ParentViewComponent implements OnInit {
	public sampledata: string;
  	sampleChildData: string ;

  constructor() { }

  ngOnInit() {
  	this.sampledata = ""

  }

  public handleChildEvent(abc: any)
  {
  		
    this.sampleChildData = abc;
  }

}
