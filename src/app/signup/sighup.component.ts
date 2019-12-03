import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sighup',
  templateUrl: './sighup.component.html',
  styleUrls: ['./sighup.component.sass']
})
export class SighupComponent implements OnInit {
  public sighupForm: FormGroup;
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
    this.sighupForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public sighup(): void {
    console.log(this.sighupForm.value);
  }

}
