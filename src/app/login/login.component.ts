import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { User } from '../classes/user';
import { EventEmitter } from '@angular/core';
import { Injectable, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }

  hasLoginError = false;
  loginErrorText = '';

  ngOnInit() {
  }

  logIn(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.auth.login(email, password)
      .then((result) => {
        const data = JSON.parse(result);
        const user = new User();
        user.name = data['name'];
        user.email = data['email'];
        this.auth.removeTokens();
        this.auth.setToken(data['token'], user);
        this.router.navigate(['']);
      })
      .catch((error: any) => {
        this.hasLoginError = true;

        error = error.json().error;

        // Check Validation errors
        if (error.email !== undefined) {
          this.loginErrorText = error.email[0];
          console.log('error', error.email[0]);
          return;
        }
        if (error.password !== undefined) {
          this.loginErrorText = error.password[0];
          console.log('error', error.password[0]);
          return;
        }

        this.loginErrorText = error;
        console.log('error', error);
      });
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
