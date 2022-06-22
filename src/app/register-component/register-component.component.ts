import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.css'],
})
export class RegisterComponentComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private User: UserService
  ) {}

  @ViewChild('title') title!: ElementRef;

  registerForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', [
      Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),
    ]),
    password: new FormControl('', [
      Validators.pattern(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
      ),
    ]),
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register = () => {
    this.http
      .post(
        'https://fake-vault-back-end.herokuapp.com/api/register',
        this.registerForm.getRawValue()
      )
      .subscribe(
        (res: any) => {
          this.title.nativeElement.innerHTML = res.message;
          setTimeout(() => this.router.navigate(['login']), 1500);
        },
        (err) => {
          this.title.nativeElement.innerHTML = err.error.message;
          this.registerForm.reset();
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
