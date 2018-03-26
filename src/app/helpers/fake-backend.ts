import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
     public urlParts:string;
     public id:number;
     currentUser: User;

    constructor(private router : Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')); }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
        // array in local storage for registered users
        let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
        
        let books: any[] = JSON.parse(localStorage.getItem('books')) || []; 
        // wrap in delayed observable to simulate server api call
        return Observable.of(null).mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {

                // find if any user matches login credentials
                let filteredUsers = users.filter(user => {
                    return user.email === request.body.email && user.password === request.body.password;
                });

                if (filteredUsers.length) {
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    let body = {
                      id: user.id,
                      username: user.username,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email : user.email,
                        
                    };

                    return Observable.of(new HttpResponse({ status: 200, body: body }));
                } else {
                    // else return 400 bad request
                    return Observable.throw('Email or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/users') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization')) {
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // get user by id
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'GET') {
                // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') ) {
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;

                    return Observable.of(new HttpResponse({ status: 200, body: user }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return Observable.throw('Unauthorised');
                }
            }

            // create user
            
            if (request.url.endsWith('/api/users') && request.method === 'POST') {
                // get new user object from post body
                let newUser = request.body.model;
                                // validation
                let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                if (duplicateUser) {
                    return Observable.throw('Username "' + newUser.username + '" is already taken');
                }

                // save new user\
                if(users.length == 0)
                {
                    newUser.id = 1;
                    } 
                else
                {
                  let u = users.length - 1;
                    newUser.id = users[u].id + 1;
                }
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                // return users;

                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 , body: request.body.model}));
            }

            //create book
            if (request.url.endsWith('/api/books') && request.method === 'POST') {
                // get new book object from post body
                let newBook = request.body.book;

                // validation
                let duplicateBook = books.filter(book => { return book.bookTitle === newBook.bookTitle; }).length;
                if (duplicateBook) {
                    return Observable.throw('bookTitle "' + newBook.bookTitle + '" is already taken');
                }
                // save new book
                if (books.length == 0){
                  newBook.bookId = 1; 
                }
                else
                {
                    let b = books.length - 1;
                      newBook.bookId = books[b].bookId + 1;
                }
                books.push(newBook);
                localStorage.setItem('books', JSON.stringify(books));
                 // return users;
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 , body: request.body.book}));
            }
            //update user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'PUT') {
            //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                let updateUser = request.body;
                for(let j = 0; j < users.length; j++)
                {
                    let user = users[j]
                    if(user.id == updateUser.id)
                    {   
                        users.splice(j,1, updateUser);
                        // users.splice(j,1);  
                        // users.push(updateUser);
                        localStorage.setItem('users', JSON.stringify(users));
                        break;
                    }  
                }
                // users.push(updateUser);
                // localStorage.setItem('users', JSON.stringify(users));
                // return users;
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 , body: users}));
            }
            //UPDATE book
            if (request.url.match(/\/api\/books\/\d+$/) && request.method === 'PUT') {
                let updateBook = request.body;
                for(let j = 0; j < books.length; j++)
                {
                    let book = books[j]
                    if(book.bookId == updateBook.bookId)
                    {   
                        books.splice(j,1, updateBook);
                        // users.splice(j,1);  
                        // users.push(updateUser);
                        localStorage.setItem('books', JSON.stringify(books));
                        break;
                    }  
                }
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 , body: books}));
            }
            //resetPassword
            if (request.url.endsWith('/api/users') && request.method === 'PUT') {
            //     // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                let resetPassword = request.body;
                let userId = users[(this.currentUser.id)+1];
                if(userId.password == resetPassword.oldPassword){
                    if (resetPassword.newPassword == resetPassword.confirmPassword)
                    {
                        userId.password = resetPassword.newPassword;
                    }
                    else{
                        return Observable.throw('New Password and Confirm Password does not match')
                    }
                }
                else{
                    return Observable.throw('Old Password is not correct')
                }
                for(let j = 0; j < users.length; j++)
                {
                    let user = users[j]
                    if(user.id == this.currentUser.id)
                    {   
                        users.splice(j,1, userId);
                        // users.splice(j,1);  
                        // users.push(updateUser);
                        localStorage.setItem('users', JSON.stringify(users));
                        break;
                    }  
                }
                // users.push(updateUser);
                // localStorage.setItem('users', JSON.stringify(users));
                // return users;
                // respond 200 OK
                return Observable.of(new HttpResponse({ status: 200 , body: users}));
            }


            // delete user
            if (request.url.match(/\/api\/users\/\d+$/) && request.method === 'DELETE') {
                    
                    // find user by id in users array
                    let urlParts = request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i < users.length; i++) {
                        let user = users[i];
                        if(this.currentUser.id != id)
                        {
                          if (user.id === id) {
                          // delete user
                                            users.splice(i, 1);
                          localStorage.setItem('users', JSON.stringify(users));
                          //this.router.navigate(['/user']);
                          break;
                          }
                       }
                       else
                       {
                          return Observable.throw('Cant delete current login user'); 
                       }
                    }
                    
                    // respond 200 OK
                    return Observable.of(new HttpResponse({ status: 200, body: users }));
                }       
                //delete book
                if (request.url.match(/\/api\/books\/\d+$/) && request.method === 'DELETE') {
                        
                        
                        // find book by id in books array
                        let urlParts = request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < books.length; i++) {
                            let book = books[i];
                        
                              if (book.bookId === id) {
                              // delete user
                              books.splice(i, 1);
                              localStorage.setItem('books', JSON.stringify(books));
                              //this.router.navigate(['/user']);
                              break;
                              }
                           
                      }
                        
                        // respond 200 OK
                        return Observable.of(new HttpResponse({ status: 200, body: books }));
                    }       

            // pass through any requests not handled above
            return next.handle(request);
            
        })

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize();
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};