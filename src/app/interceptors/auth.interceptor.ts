import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor  {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = request.clone({
      withCredentials: true,
    });

      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            return this.handle401Error(req, next, err);
          } else {
            return throwError(() => err);
          }
        })
      )
    }

    private handle401Error(
      req: HttpRequest<any>,
      next: HttpHandler,
      originalError: any
    ) {

      if (req.url.split('/')[5] != 'refresh') {
        return this.authService.refresh().pipe(
          switchMap(() => next.handle(req)),
          catchError(() => {
            this.router.navigateByUrl('/login');
            return throwError(() => originalError);
          })
        )
      } else {
        return throwError(() => originalError);
      }
    }

}
