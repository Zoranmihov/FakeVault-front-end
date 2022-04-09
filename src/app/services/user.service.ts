import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  getProfile = () => {
    this.http
      .get('https://fake-vault-back-end.herokuapp.com/api/profile', {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          this._isLoggedIn$.next(true);
        },
        (err) => {
          this._isLoggedIn$.next(false);
        }
      );
  };
}
