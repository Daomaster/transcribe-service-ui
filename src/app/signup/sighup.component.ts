import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../service/user.service';
import {User} from '../models/user';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sighup',
  templateUrl: './sighup.component.html',
  styleUrls: ['./sighup.component.sass']
})
export class SighupComponent implements OnInit {
  public sighupForm: FormGroup;
  public loading = false;

  constructor(
    private fb: FormBuilder,
    private userApi: UserService,
    private router: Router,
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): void {
    this.sighupForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public sighup(): void {
    const user = new User(this.sighupForm.value);
    this.userApi.createUser(user)
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

}
