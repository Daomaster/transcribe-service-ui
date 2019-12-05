import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Jwt} from '../models/jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private readonly tokenLocation = 'jwt';
  private readonly authApiUrl = `${environment.apiUrl}/auth`;
  private jwt: Jwt | null = null;


  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  // login base on the user info
  public login(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.authApiUrl}/login`, user);
  }

  // check if the user is logged in
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // save the token in mem
  public saveToken(token: Jwt) {
    this.jwt = token;
    localStorage.setItem(this.tokenLocation, JSON.stringify(token));
  }

  // logout
  public logout() {
    this.deleteToken();
    this.router.navigate(['/login']);
  }

  // getter for the token, currently saved in mem
  public getToken(): Jwt | null {
    const jwt = new Jwt();
    const token = JSON.parse(localStorage.getItem(this.tokenLocation));

    // check the token exist in local storage
    if (token == null) {
      return null;
    }

    jwt.token = token.token;
    jwt.expire = new Date(token.expire);

    // check the time if it expired
    if (jwt.expire <= new Date()) {
      this.deleteToken();
      return null;
    }

    return jwt;
  }

  // delete token from local storage
  private deleteToken() {
    localStorage.removeItem(this.tokenLocation);
  }
}
