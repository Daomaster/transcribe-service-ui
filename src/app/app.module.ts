import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {UserService} from './service/user.service';
import {TranscriptionService} from './service/transcription.service';
import {AuthService} from './service/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './service/jwt.interceptor';
import {LoginComponent} from './login/login.component';
import {SharedModule} from './shared/shared.module';
import {SighupComponent} from './signup/sighup.component';
import {TranscriptionTableComponent} from './transcription-table/transcription-table.component';
import {TranscriptionDetailComponent} from './transcription-detail/transcription-detail.component';
import {TranscriptionCreateDialogComponent} from './transcription-create-dialog/transcription-create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {FileUploadComponent} from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    LoginComponent,
    SighupComponent,
    TranscriptionTableComponent,
    TranscriptionDetailComponent,
    TranscriptionCreateDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MatDialogModule,
  ],
  providers: [
    UserService,
    TranscriptionService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TranscriptionCreateDialogComponent,
  ],
})
export class AppModule { }
