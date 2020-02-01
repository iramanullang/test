import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from '.../../node_modules/rxjs';
import { AuthService } from './authservice';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    validationErrors = [];

    constructor(
        private router: Router,
        public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Authorization: 'Bearer ' + this.auth.getToken()
            }
        });

        return next.handle(request);
    }

    //  Error Handling
    errorHandling(result: any) {
      this.validationErrors = [];

      if (result != null) {
        const code = result.status;
        console.log(' const code = result.status;', code);
        if (code === 401 || code === 403) {
          this.router.navigate(['login']);
        } else if (code === 404) {
          this.router.navigate(['404']);
        } else {
          let errorMessage = '';
          for (let i = 0; i < result.error.error.length; i++) {
            errorMessage += result.error.error[i] + '<br/>';
          }
          this.validationErrors.push(errorMessage);
        }
      } else {
        this.validationErrors.push('Internal Server Error');
      }

      if (this.validationErrors.length > 0) {
          console.log('dosomething');
      }
    }

    //  success Handling
    successHandling(result: any) {
        console.log('dosomething');
    }
}

