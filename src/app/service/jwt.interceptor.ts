import {Injectable, Injector} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private authApi: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;

    const token = this.authApi.getToken();

    if (token) {
      requestToForward = req.clone({setHeaders: {Authorization: `Bearer ${token.token}`}});
    }

    return next.handle(requestToForward)
      .pipe(tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

          }
        }, (err: any) => {
          if (err instanceof HttpErrorResponse) {

          }
        }
      ));
  }
}
