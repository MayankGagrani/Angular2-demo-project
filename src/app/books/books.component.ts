import { Component, TemplateRef, EventEmitter, Inject, Renderer, Input, OnInit, Output, ViewChild, ElementRef, Pipe, PipeTransform} from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DialogService } from "ng2-bootstrap-modal";
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BookService} from '../service/book.service';
import { SharedService} from '../service/shared.service';
import { ModalConfirmComponent} from '../modal-confirm/modal-confirm.component';
import { FormControl, FormGroup, Validators, PatternValidator, NgForm } from '@angular/forms';
//import { SearchFilterPipe } from '../pipe/search-filter.pipe';


export interface bookModel{
  book: Book;
}
export class Book{
  bookId: number;
    bookTitle: string;
    topic: string;
    author: string;
    cost: number;
    quantity: number;
    issued: boolean;

}

@Pipe({ name: 'SearchFilterPipe'})
@Pipe({ name: 'SortByPipe'})

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  public modalRef: BsModalRef;
  public book: Book;
  books: Book[]= [];
  numberpattern ="[0-9]*";
  //public searchInput:any ='';
  public searchQuery:any ='';
  public noResult:boolean = false;
  bookError: boolean = false;
  BookErrorMessage: string;
  private sortByKey: string;
  @ViewChild('createBookModal') public createBookModal: ModalDirective;
  constructor(public router : Router,public dialogService: DialogService, public modalService: BsModalService , private bookService: BookService,private sharedService: SharedService) {
    this.books = JSON.parse(localStorage.getItem('books'));
    this.book = new Book();
    this.book.bookTitle = '';
    this.book.topic = '';
    this.book.author = '';
    this.book.cost = null;
    this.book.issued = false;

  }

  ngOnInit() {
  }

  public createBookDialogue(){
    this.book.bookTitle = '';
    this.book.topic = '';
    this.book.author = '';
    this.book.cost = null;
    this.book.quantity = null;
    this.book.issued = false;
  	this.createBookModal.show();

  }
  public submitBook(form:NgForm){
  
  if (!form.valid)
  {
    return;
  }

  {
    let obj = {
      book : this.book 
    }
    if("bookId" in this.book){
      this.updateBook(obj)
    } 
    else 
    {
      this.createBook(obj);
    } 
  }
}

  public createBook(obj){
    this.bookService.create(obj)
    .subscribe((response:any)  => {
      this.books = response;
      this.createBookModal.hide();

    },
    (err) =>{
      this.bookError = true;
      this.BookErrorMessage = err.split(",")
    });
  }

  public deleteBook(book){
    this.dialogService.addDialog(ModalConfirmComponent,{
      title: 'Are you sure you want to delete the Book?',
      message: 'Book Name: '+ book.bookTitle + ' ' + book.topic + ' ' +  
               'Id: '+ book.bookId
    }).subscribe((isConfirmed)=>{
      if(isConfirmed){
        this.bookService.delete(book.bookId).
         subscribe((response:any) => { 
          this.books = response;
          // this.router.navigate[('/book')]   
      },(err)=>
      {
          console.log("Error from API")
      });
    }
    

    });
  }

  public updateBook(obj)
  {
    this.bookService.bookUpdate(obj).
    subscribe((response : any)=>
    {
      this.books = response;
      this.createBookModal.hide();

    });
  }

  public openBookModal(book)
  {
      this.book.bookTitle = book.bookTitle;
      this.book.topic = book.topic;
      this.book.author = book.author;
      this.book.cost = book.cost;
      this.book.bookId = book.bookId;
      this.book.quantity = book.quantity;
      this.book.issued = book.issued;
      this.createBookModal.show();
  }

  public viewOrder(book)
  {
      this.sharedService.setBooks(book);
      this.router.navigate(['/vieworder']);
  }


  // public selectSurveySearchIcon(){
  //   let searchQuery = this.searchInput;
  //   let noResults = false;
  //   let breakOut = false;
  //   $('.table tr').each(function (index) {
  //     if (index === 0) return;
  //     var name = $(this).text().trim().replace(/ +/g, "").toLowerCase();
  //     if(name.indexOf(searchQuery.replace(/ +/g, "").toLowerCase()) !==-1){
  //       $(this).removeClass('hidden');
  //       $(this).parents('tr').removeClass('hidden');
  //       breakOut = true;
  //       return;
  //     }
  //     else{
  //       noResults = true;
  //       $(this).addClass('hidden');
  //       $(this).parents('tr').addClass('hidden');
  //     }
  //   });
  //   if(noResults){
  //     this.noResult = true;
  //   }
  //   if(breakOut){
  //     this.noResult = false;
  //   }
  // }

  onCloseHandled(){
  	this.createBookModal.hide();
  }

 public closeErrorAlert(){
    if(this.bookError == true){
      this.bookError = false;
    }
  }
}
