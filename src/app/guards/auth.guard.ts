import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    // make sure user has to login or auto redirect to login route
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
