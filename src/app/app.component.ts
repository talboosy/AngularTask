import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn= false;
  public globalData: any;
  constructor(public service:AuthService, private router:Router) { 

  }

  ngOnInit(): void {
    // this.isLoggedIn = this.service.isLoggedIn
    // console.log(this.isLoggedIn)
    this.getDataFromAPI();
    this.service.data = this.service.getUserData()
    
  }
  onLogout() {
    this.service.isLoggedOut();
    this.service.logout();
    this.router.navigate(['']);
    localStorage.setItem('x-auth-token', '');
  }

  getDataFromAPI() {
    this.service.getData().subscribe((response) => {
      console.log('Response from API - ', response)
    }, (error)=> {
      console.log('error is ', error)
    })
  }



  
  title = 'angular-task';
}
