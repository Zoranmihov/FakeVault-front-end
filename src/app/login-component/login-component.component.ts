import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'],
})
export class LoginComponentComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private User: UserService
  ) {}

  @ViewChild('title') title!: ElementRef;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login = () => {
    this.http
      .post('https://fake-vault-back-end.herokuapp.com/api/login', this.loginForm.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.title.nativeElement.innerHTML = res.message;
          setTimeout(() => (window.location.href = ''), 1500);
        },
        (err) => {
          this.title.nativeElement.innerHTML = err.error.message;
          this.loginForm.reset();
        }
      );
  };

  ngOnInit(): void {
    this.User.isLoggedIn$.subscribe((result) => {
      if (result) {
        window.location.href = '/';
      }
    });
  }
}
