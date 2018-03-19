import { Component, TemplateRef, EventEmitter, Inject, Renderer, Input, OnInit, Output, ViewChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DialogService } from "ng2-bootstrap-modal";
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
public modalRef: BsModalRef;
  
  @ViewChild('createBookModal') public createBookModal: ModalDirective;
  constructor(public router : Router,public dialogService: DialogService, public modalService: BsModalService) { 

  }

  ngOnInit() {
  }

  public createBookDialogue(){
  	this.createBookModal.show();

  }

  onCloseHandled(){
  	this.createBookModal.hide();
  }
}
