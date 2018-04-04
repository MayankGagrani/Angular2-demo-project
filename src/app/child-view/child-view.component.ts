import { Component, OnInit, Input , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-view',
  templateUrl: './child-view.component.html',
  styleUrls: ['./child-view.component.css']
})
export class ChildViewComponent implements OnInit {
	@Input('parentData') parentsdata : string;
	@Output('change') childsData =  new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  public sendChildData(data:any)
  {
  	this.childsData.emit(data);

  }

}
