import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AllUserDetail } from './all-user-detail';
import { HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  public callGitApiToGetUsers(userName: String): Observable<AllUserDetail> {

    return this.http.get<AllUserDetail>('https://api.github.com/search/users?q=' + userName);
  }


}
