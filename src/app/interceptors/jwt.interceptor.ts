import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting request:', req.url);
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token); // Enhanced logging
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Authorization header set:', req.headers.get('Authorization')); // Debugging log
    } else {
      console.warn('No token found in localStorage');
    }
    return next.handle(req).pipe(
      tap(event => console.log('HTTP Event:', event)),
      catchError(error => {
        console.error('Interceptor error:', error);
        return throwError(error);
      })
    );
  }
}
