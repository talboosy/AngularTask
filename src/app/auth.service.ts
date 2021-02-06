import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.model';


interface AuthResponseData {
  token: string,
  userId: string,
  name: string,
  email: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedIn.asObservable();
  public data: any;
  public currentUser: any;
  user = new Subject<User>();

  constructor(private http: HttpClient, private router: Router) { }

  public isLogged() {
    this.isLoggedIn.next(true);
  }

  login(email: string, password: string) {
    this.currentUser = email;
    return this.http.post<AuthResponseData>('/api/auth/login', {
      "email": email,
      "password": password
      
  })
}

  public isLoggedOut() {
    this.isLoggedIn.next(false);
  }

  logout() {
      return this.http.get('/api/auth/logout', {})
  }

  getData() {
    return this.http.get('/api/getData')
   }

   getUserData() {
     this.http.get('/api/datas').subscribe(res => {
       this.data = res;
     })
   }

   verifyToken() {
    var token = localStorage.getItem('x-auth-token')
    if(localStorage.getItem('x-auth-token')) {
      return true
    }
    else {
      return false
    }
  }

  
}
