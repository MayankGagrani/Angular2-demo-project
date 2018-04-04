import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService} from '../service/shared.service';
import { BookService} from '../service/book.service';
import { DialogService } from "ng2-bootstrap-modal";
import { User } from '../models/user';

export interface bookModel{
  book: Book;
}
export class Book {
  bookId: number;
    bookTitle: string;
    topic: string;
    author: string;
    cost: number;
    quantity: number;
    issued: boolean;
}

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
	books: Book[];
	public book : Book;
	data: any;
	currentUser: User[];


  constructor(private router : Router,private sharedService: SharedService, private bookService: BookService) 
  { 	
  		this.data = this.sharedService.getBook();
  		this.books = JSON.parse(localStorage.getItem('books'));
  		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  		this.book = new Book();
  		// this.book.bookTitle = '';
  		this.book.issued = false;
  }

  ngOnInit() {
  }

  public issueBook(book){
  	book.issued = true;
  	this.bookService.issueUpdate(book).
  	subscribe((response: any)=>
  	{
  		
  		this.router.navigate(['/book']);
  	}, (err)=>
  	{

  	});
  	
  }

  
  public returnBook(book){
  	book.issued = false;
  	this.bookService.issueUpdate(book).
  	subscribe((response: any)=>
  	{
  		
  		this.router.navigate(['/book']);
  	}, (err)=>
  	{

  	});
  	
  }

  public Confirm(book){

  }

}
