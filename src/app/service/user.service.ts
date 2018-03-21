import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpClientModule , HttpClient} from '@angular/common/http';
import { User } from '../models/user'; 
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

     getAll() {
        return this.http.get('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }
    
    create(user) {
        return this.http.post('/api/users', user)
        //.map(response =>  response.json() );
    }

    update(model) {
        return this.http.put('/api/users/' + model.id, model);
    }

    delete(id,currentUser) {
      return this.http.delete('/api/users/' + id)
      // .map((response: any) => {
      //   console.log(response);
      //  return response; })
      // .map((response: Response) => { return response;}).catch((error:any) => Observable.throw(error.json()));
    }

    resetPassword(model){
      return this.http.put('/api/users', model)

    }

}
