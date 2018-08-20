import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../classes/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  hasSignupError = false;
  signupErrorText = '';

  ngOnInit() {
  }

  signUp(form: NgForm) {

    if (!form.valid) {
      return false;
    }

    const email = form.value.email;
    const name = form.value.name;
    const password = form.value.password;

    this.auth.signup(email, name, password)
      .then((result) => {
        const data = JSON.parse(result);
        const user = new User();
        user.name = data['name'];
        user.email = data['email'];
        this.auth.setToken(data['token'], user);
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        this.hasSignupError = true;

        error = error.json().error;

        // Check Validation errors
        if (error.name !== undefined) {
          this.signupErrorText = error.name[0];
          console.log('error', error.name[0]);
          return;
        }
        if (error.email !== undefined) {
          this.signupErrorText = error.email[0];
          console.log('error', error.email[0]);
          return;
        }
        if (error.password !== undefined) {
          this.signupErrorText = error.password[0];
          console.log('error', error.password[0]);
          return;
        }

        this.hasSignupError = error;
        console.log('error', error);
      });
  }

  logIn() {
    this.router.navigate(['login']);
  }
}
