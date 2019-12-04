import {Component} from '@angular/core';
import {TranscriptionService} from '../service/transcription.service';
import {Transcription} from '../models/transcription';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-transcription-detail',
  templateUrl: './transcription-detail.component.html',
  styleUrls: ['./transcription-detail.component.sass']
})
export class TranscriptionDetailComponent {
  public transcription: Transcription;

  private readonly id: string;

  constructor(
    private transApi: TranscriptionService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.id = route.snapshot.params.id;

    this.getTranscription();
  }

  public getTranscription() {
    this.transApi.getTranscriptionById(this.id)
      .pipe(first())
      .subscribe(
        (trans: Transcription) => {
          this.transcription = trans;
        },
        (err: HttpErrorResponse) => {
          // there is error then go back the previous page
          this.router.navigate(['/transcription']);
        }
      );
  }

  public getPrettyJson(): string {
    return JSON.stringify(JSON.parse(this.transcription.result), null, 2);
  }
}


