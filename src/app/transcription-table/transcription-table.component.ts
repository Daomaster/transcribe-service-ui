import {Component} from '@angular/core';
import {TranscriptionService} from '../service/transcription.service';
import {Transcription} from '../models/transcription';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {first} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {TranscriptionCreateDialogComponent} from '../transcription-create-dialog/transcription-create-dialog.component';

@Component({
  selector: 'app-transcription-table',
  templateUrl: './transcription-table.component.html',
  styleUrls: ['./transcription-table.component.sass']
})
export class TranscriptionTableComponent {
  public dataSource: MatTableDataSource<Transcription>;
  public displayedColumns: string[] = ['id', 'username', 'filePath', 'result', 'fileName', 'menu'];

  constructor(
    private transApi: TranscriptionService,
    private dialog: MatDialog,
  ) {
    this.getTranscription();
  }

  public getTranscription() {
    this.transApi.getAllTranscription()
      .pipe(first())
      .subscribe(
        (trans: Transcription[]) => {
          this.dataSource = new MatTableDataSource<Transcription>(trans);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  public generateRoute(trans: Transcription): string {
    return './' + trans.id;
  }

  public createTranscription() {
    const option = {
      width: '450px',
      height: '250px',
      disableClose: true
    };

    const dialog = this.dialog.open(TranscriptionCreateDialogComponent, option);

    dialog.beforeClosed()
      .pipe(first())
      .subscribe(
        data => {
          if (data.confirm) {
            this.getTranscription();
          }
        }
      );
  }
}
