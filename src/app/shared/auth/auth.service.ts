import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Constants } from 'app/shared/services/constants';

@Injectable()
export class AuthService {

  constructor(
    private http: Http
  ) {}

  private loadHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    return headers;
  }

  storeLoginData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadToken() {
    var token = localStorage.getItem('id_token');
    return token;
  }

  isAuthenticated() {
    return tokenNotExpired('id_token');
  }

  login(username: string, password: string)  {
    const data = {
      'username': username,
      'password':  password
    }
    return this.http.post(Constants.API_ENDPOINT + '/api/signin' ,JSON.stringify(data),{headers: this.loadHeaders()})
        .map(res=> res.json());
  }

  logout() {   
    localStorage.clear();
  }
}

