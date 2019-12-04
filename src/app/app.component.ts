import {Component} from '@angular/core';
import {AuthService} from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'Transcription Service';

  constructor(
    private authApi: AuthService,
  ) {
  }

  public logout() {
    this.authApi.logout();
  }

  public isLoggedIn(): boolean {
    return this.authApi.isLoggedIn();
  }
}
