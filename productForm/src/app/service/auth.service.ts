import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private route:Router) { }

  setToken(token:string):void{
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return this.getToken() !== null;
  }

  logout(){
    localStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    if (email === 'admin@gmail.com' && password === 'Admin@123') {
      this.setToken('abcdefghijklmnopqrstuvwxyz');
      return of({ name: 'Admin', email: 'admin@gmail.com' });
    }
    return throwError(new Error('Failed to login'));
  }

}
