import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public loading = false;

  private alive: boolean;

  constructor(
    private fb: FormBuilder
  ) {
    this.alive = true;

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
    console.log(this.loginForm.value);
  }

}
