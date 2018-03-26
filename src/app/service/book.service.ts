import { Injectable } from '@angular/core';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { 
  	
  }

   create(book)
   {
    return this.http.post('/api/books', book)
   }

   delete(id){
     return this.http.delete('/api/books/'  + id)

   }

  bookUpdate(obj){
    return this.http.put('/api/books/' + obj.book.bookId, obj.book)
  }

  issueUpdate(book){
    return this.http.put('/api/books/' + book.bookId, book)
  }
}
