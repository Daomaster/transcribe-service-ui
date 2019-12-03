import {Component, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private authApi: AuthService,
    private router: Router,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public login(): void {
    const user = new User(this.loginForm.value);
    this.authApi.login(user)
      .pipe(first())
      .subscribe(
        (token: Jwt) => {
          this.authApi.saveToken(token);
          this.router.navigate(['transcription']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.loginForm.controls.password.setErrors({});
        }
      );
  }

}
