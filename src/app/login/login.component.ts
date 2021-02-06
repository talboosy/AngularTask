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
  authError = false;
  errorMessage: any;
  constructor(private router: Router, private service:AuthService) { }

  ngOnInit(): void {
  }

  onSubmitLogin(form: NgForm) {
    this.service.login(form.value.email, form.value.password).subscribe((response)=> {
      const token = response.token
      this.service.isLogged()
      localStorage.setItem('x-auth-token', token);
      this.router.navigate(['dashboard']);
  }, error => {
    if(error.status == 404){
      this.authError = true
      this.errorMessage = error.error
    }
    else if (error.status == 401) {
      this.authError = true
      this.errorMessage = error.error.message
    }
    
  })
    
    

  }

}
