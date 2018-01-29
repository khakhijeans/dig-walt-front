import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { AuthService } from 'app/shared/auth/auth.service';
import { Constants } from 'app/shared/services/constants';

@Injectable()
export class DocumentService {

  constructor(
    private authService: AuthService,
    private http: Http
  ) {}

  getDocumentList(companyId: number) {
    return this.http.get(Constants.API_ENDPOINT + '/api/files/' + companyId, {headers: this.loadHeaders()})
        .map(res=> res.json());
  }

  
  deleteDocument(fileId: number) {
    return this.http.delete(Constants.API_ENDPOINT + '/api/delete/' + fileId, {headers: this.loadHeaders()})
        .map(res=> res.json());
  }

  private loadHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json' );
    return headers;
  }

}