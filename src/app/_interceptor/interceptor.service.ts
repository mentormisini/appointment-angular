import { Injectable } from '@angular/core';
import { ToastrService} from 'ngx-toastr';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router,
              private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${currentUser.token}`
        }
      });
    }*/

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          this.router.navigate(['login']);
          // ne display na dalin 2 notification ? arsya: jan dy 401 requests;
          this.toastr.info(
            'Pastaj realizo terminin',
            'Logohu se pari ',
            {timeOut: 5000,
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
            positionClass: 'toast-bottom-center'});
        }
      }));
  }
}
