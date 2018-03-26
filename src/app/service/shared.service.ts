import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

  constructor() { }

  public book: any;

  public setBooks(value: any)
  {
  	this.book = value;

  }

  public getBook(): any
  {
  	return this.book;
  }

}
