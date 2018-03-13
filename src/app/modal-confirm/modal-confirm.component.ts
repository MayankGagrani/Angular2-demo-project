import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

export interface ConfirmModel {
  title:string;
  message:string;
  leftButton:string;
  rightButton:string;
}

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css']
})
export class ModalConfirmComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
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
