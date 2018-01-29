import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from 'app/shared/auth/auth.service';
import { Constants } from 'app/shared/services/constants';

@Injectable()
export class CompanyService {

  constructor(
    private authService: AuthService,
    private http: Http
  ) {}

  getCompanyList() {
    return this.http.get(Constants.API_ENDPOINT + '/api/company' , {headers: this.loadHeaders()})
        .map(res=> res.json());
  }

  saveCompany(data) {
    return this.http.post(Constants.API_ENDPOINT + '/api/company', data , {headers: this.loadHeaders()})
        .map(res=> res.json());
  }

  private loadHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    return headers;
  }

}