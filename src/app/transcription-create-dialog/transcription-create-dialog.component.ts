import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {TranscriptionService} from '../service/transcription.service';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-transcription-create-dialog',
  templateUrl: './transcription-create-dialog.component.html',
  styleUrls: ['./transcription-create-dialog.component.sass']
})
export class TranscriptionCreateDialogComponent {
  public loading = false;
  public isError = false;
  public createForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TranscriptionCreateDialogComponent>,
    private transApi: TranscriptionService,
    private fb: FormBuilder
  ) {
    this.initForm();
  }

  public cancel(): void {
    this.dialogRef.close({
      confirm: false
    });
  }

  public create() {
    this.isError = false;
    this.loading = true;

    // prepare the form data
    const formValue = this.createForm.value;
    const formData = new FormData();
    formData.append('file', formValue.videoFile);

    // post the video file to the server
    this.transApi.createTranscription(formData)
      .pipe(first())
      .subscribe(
        () => {
          this.loading = false;

          this.dialogRef.close({
            confirm: true
          });
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          this.isError = true;
          this.loading = false;
        }
      );

  }

  private initForm() {
    this.createForm = this.fb.group({
      videoFile: new FormControl(null, Validators.required)
    });
  }

}
