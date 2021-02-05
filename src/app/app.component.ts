import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLoggedIn= false;
  constructor(private service:AuthService) { 

  }

  ngOnInit(): void {
    // this.isLoggedIn = this.service.isLoggedIn
    // console.log(this.isLoggedIn)
    this.getDataFromAPI();
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
