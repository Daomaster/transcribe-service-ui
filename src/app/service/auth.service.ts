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

  public login(user: User): Observable<Jwt> {
    return this.http.post<Jwt>(`${this.authApiUrl}/login`, user);
  }

  public isLoggedIn(): boolean {
    return this.jwt != null;
  }

  public getToken(): Jwt | null {
    return this.jwt;
  }

  public saveToken(token: Jwt) {
    this.jwt = token;
  }
}
