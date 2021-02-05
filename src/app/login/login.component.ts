import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loggedIn= false;
  constructor(private router: Router, private service:AuthService) { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    this.service.login(form.value.email, form.value.password).subscribe((response)=> {
      this.service.logIn()
      this.router.navigate(['dashboard']);
  }, error => {
    console.log(error);
  })
    
    

  }

}
