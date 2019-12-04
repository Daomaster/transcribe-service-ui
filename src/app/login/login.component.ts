import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../service/auth.service';
import {User} from '../models/user';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Jwt} from '../models/jwt';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthService,
    private router: Router,
  ) {
    // check if the user already logged in
    if (this.authApi.isLoggedIn()) {
      this.router.navigate(['transcription']);
    }

    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): void {
    const user = new User(this.loginForm.value);
    this.loading = true;

    this.authApi.login(user)
      .pipe(first())
      .subscribe(
        (token: Jwt) => {
          this.authApi.saveToken(token);
          this.router.navigate(['transcription']);
          this.loading = false;
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.loginForm.controls.password.setErrors({});
          this.loading = false;
        }
      );
  }

}
