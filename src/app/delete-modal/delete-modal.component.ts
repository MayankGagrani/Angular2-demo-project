import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface emailConfirm {
  title:string;
  message:string;
  leftButton:string;
  rightButton:string;
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent extends DialogComponent<emailConfirm, boolean> implements emailConfirm{
	title: string;
  message: string;
  leftButton:string;
  rightButton:string;

  constructor(dialogService: DialogService) {
  	super(dialogService);
  	 }

  confirm() {
   	this.result = true;
    this.close();
  }
  cancel() {
    this.result = false;
    this.close();
  }

}
