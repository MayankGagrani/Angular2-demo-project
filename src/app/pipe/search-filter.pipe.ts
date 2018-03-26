import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../models/book';

@Pipe({
  name: 'SearchFilterPipe'
})
export class SearchFilterPipe implements PipeTransform {

  public transform(books: Book[], args: any): Book[] {
        if (args != undefined) {
            let resultantBooks = books.filter(book => book.bookTitle.toUpperCase().indexOf(args.toUpperCase()) !== -1);
            return resultantBooks;
            // let resultantBooksByAuthor = books.filter(book => book.author.toUpperCase().indexOf(args.toUpperCase()) !== -1);
            // return resultantBooksByAuthor;
        }
        else {
            return books;
        }
    }
}
