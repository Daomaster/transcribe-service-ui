import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Jwt} from '../models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiUrl = `${environment.apiUrl}/auth`;
  private jwt: Jwt | null = null;

  constructor(private http: HttpClient) { }

  // login base on the user info
  public login(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.authApiUrl}/login`, user);
  }

  // check if the user is logged in
  public isLoggedIn(): boolean {
    return this.jwt != null;
  }

  // getter for the token, currently saved in mem
  public getToken(): Jwt | null {
    return this.jwt;
  }

  // save the token in mem
  public saveToken(token: Jwt) {
    this.jwt = token;
  }
}
