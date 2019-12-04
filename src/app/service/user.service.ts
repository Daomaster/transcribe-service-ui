import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly userApiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  // create user
  public createUser(user: User): Observable<null> {
    return this.http.post<null>(this.userApiUrl, user);
  }
}
