import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Transcription} from '../models/transcription';

@Injectable({
  providedIn: 'root'
})
export class TranscriptionService {
  private readonly transApiUrl = `${environment.apiUrl}/transcription`;

  constructor(private http: HttpClient) { }

  // create transcription
  public createTranscription(toAdd: FormData): Observable<null> {
    return this.http.post<null>(this.transApiUrl, toAdd);
  }

  // get all transcription
  public getAllTranscription(): Observable<Transcription[]> {
    return this.http.get<Transcription[]>(this.transApiUrl);
  }

  // get transcription by id
  public getTranscriptionById(id: string): Observable<Transcription> {
    return this.http.get<Transcription>(`${this.transApiUrl}/${id}`);
  }
}
