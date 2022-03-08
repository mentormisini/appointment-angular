import { Injectable } from '@angular/core';
import { JwtHelperService} from '@auth0/angular-jwt';
import {stringify} from 'querystring';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  private token: string;
  private jwtHelper = new JwtHelperService();
  private loggedUsername: string;
  constructor() {
  }
  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }
  public saveUser(user) {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  public loadToken() {
    this.token = localStorage.getItem(TOKEN_KEY);
  }
  public logOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.clear();
  }
  public isLoggedIn(): boolean {
    this.loadToken();
    if(this.token != null && this.token !== '') {
      if(this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if(!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }

  }
}
