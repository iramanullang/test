import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
//import decode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
  [x: string]: any;
    Url: string;

    constructor(
        private http: HttpClient) {
            this.Url = ''
    }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
        const token = this.getToken();
        return token ? true : false;
        if (token) {
          //if (token.expired) {
              // renew token
              this.authService.refreshToken().subscribe(result => {
             
          })
    }
  }
    public logout() {
      localStorage.removeItem('token');
    }
    public get logIn(): boolean {
      return (localStorage.getItem('token') !== null);
    }

    login(username: string, password: string) {
      const body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);
      body.set('grant_type', 'password');
      // return this.http.post<any>(environment.AuthUrl + `/api/Account/Authenticate`, { username, password })
      return this.http.post<any>('https://dotsoauth2.azurewebsites.net/token', body.toString())
      
      .pipe(
        map(user => {
            if (user && user.access_token) {
              localStorage.setItem('token', user.access_token);
              localStorage.setItem('role', user.role.split(','));
              localStorage.setItem('user', JSON.stringify(user));
            //   this.currentUserSubject.next(user);
            }
            return user;
          })
      );
    }
}
