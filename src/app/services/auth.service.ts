import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';
import { User } from '../classes/user';

export const TOKEN_NAME = 'jwt_token';
export const USER_DATA_NAME = 'user_data';

@Injectable()
export class AuthService {

  private url = 'http://localhost:8000/api/user';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  isUserLoggedIn(): boolean {
    // Check if logged
    if (!!this.getToken() && !this.isTokenExpired()) {
      return true;
    }

    return false;
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  getUserData(): User {
    const userData = localStorage.getItem(USER_DATA_NAME);
    return JSON.parse(userData);
  }

  setToken(token: string, user: User): void {
    localStorage.setItem(TOKEN_NAME, token);
    localStorage.setItem(
      USER_DATA_NAME,
      JSON.stringify(user));
  }

  removeTokens() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USER_DATA_NAME);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);

    if (decoded.exp === undefined) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  login(email, password): Promise<string> {
    return this.http
      .post(`${this.url}/login`,
        JSON.stringify(
          {
            email: email,
            password: password
          }
        ),
        { headers: this.headers })
      .toPromise()
      .then(res => res.text());
  }

  signup(email, name, password): Promise<string> {
    return this.http
      .post(`${this.url}/register`,
        JSON.stringify(
          {
            email: email,
            name: name,
            password: password
          }
        ),
        { headers: this.headers })
      .toPromise()
      .then(res => res.text());
  }

  logout() {
    this.removeTokens();
  }
}
