import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

  public isLogged() {
    this.isLoggedIn.next(true);
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('/api/users/login', {
      "email": email,
      "password": password
  })
}



  public isLoggedOut() {
    this.isLoggedIn.next(false);
  }
  getData() {
    return this.http.get('/api/getData')
   }

  logout() {
    //   return this.http.post('/api/users/logoutAll', {})
  }
}
