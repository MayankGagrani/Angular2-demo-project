import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'SearchFilterTwoPipe'

})
export class SearchFilterTwoPipe implements PipeTransform {

  public transform(users: User[], args: any): User[] {
        if (args != undefined) {
            let resultantUsers = users.filter(user => user.email.toUpperCase().indexOf(args.toUpperCase()) !== -1);
                        return resultantUsers;
            // let resultantBooksByAuthor = books.filter(book => book.author.toUpperCase().indexOf(args.toUpperCase()) !== -1);
            // return resultantBooksByAuthor;
        }
        else {
            return users;
        }
    }

}
