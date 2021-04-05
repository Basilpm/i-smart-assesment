import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class APICallerService {
  constructor(private http: HttpClient) {
  }

  getCall(url) {
    return this.http
      .get(url)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
  postCall(url, data) {
    return this.http
      .post(url, data)
      .map((response: any) => response)
      .catch((error: any) => Observable.throw(error));
  }
}
