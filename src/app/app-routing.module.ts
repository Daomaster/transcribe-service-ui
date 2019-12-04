import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SighupComponent} from './signup/sighup.component';
import {TranscriptionTableComponent} from './transcription-table/transcription-table.component';
import {AuthGuard} from './guards/auth.guard';
import {TranscriptionDetailComponent} from './transcription-detail/transcription-detail.component';

const routes: Routes = [
  { path: 'transcription', component: TranscriptionTableComponent, canActivate: [AuthGuard] },
  { path: 'transcription/:id', component: TranscriptionDetailComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sighup', component: SighupComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
