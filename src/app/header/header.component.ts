import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // isLoggedIn= false;

  constructor(private router: Router, public service:AuthService) { }

  ngOnInit(): void {
    // this.isLoggedIn = this.service.isLoggedIn
    // console.log(this.isLoggedIn)
  }

  onLogout() {
    this.service.logOut()
    this.router.navigate(['']);
  }

}
