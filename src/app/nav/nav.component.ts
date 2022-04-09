import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  loaded = false;
  isAuth: any;

  constructor(private User: UserService, private http: HttpClient) {}

  logout() {
    let answer = window.confirm(
      'This will log you out of every device you may be logged in. Do you wish to proceed?'
    );
    if (answer) {
      this.http
        .get('https://fake-vault-back-end.herokuapp.com/api/logout', { withCredentials: true })
        .subscribe((res) => {
          window.location.reload();
        });
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.User.isLoggedIn$.subscribe((result) => {
      this.isAuth = result;
    });
    this.loaded = true;
  }
}
