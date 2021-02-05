import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    var isAuthenticated = this.service.verifyToken()
    console.log(isAuthenticated)
    if(!isAuthenticated){
      this.router.navigate([''])
    }
  }

  getData() {
    const data = this.service.getUserData()
    // console.log(data)
  }

}
