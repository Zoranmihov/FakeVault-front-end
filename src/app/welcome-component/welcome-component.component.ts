import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome-component.component.html',
  styleUrls: ['./welcome-component.component.css'],
})
export class WelcomeComponentComponent implements OnInit {
  isAuth: any;
  progress: any;
  documentName: any;
  loaded = false;
  formData = new FormData();

  @ViewChild('progressBar') progressBar!: ElementRef;
  @ViewChild('fileinput') fileinput!: ElementRef;
  @ViewChild('title') title!: ElementRef;

  constructor(private http: HttpClient, private User: UserService) {}

  choseFile() {
    this.fileinput.nativeElement.click();
  }

  getDescription(event: any) {
    let description = event.target.value;
    this.formData.set('description', description);
  }

  getInput(event: any) {
    let document = event.target.files[0];
    this.documentName = document.name;
    this.formData.set('document', document);
  }

  uploadFile = () => {
    this.progressBar.nativeElement.style.display = 'block';
    this.http
      .post('https://fake-vault-back-end.herokuapp.com/api/fileupload', this.formData, {
        withCredentials: true,
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event: any) => {
          if (event['loaded'] && event['total']) {
            this.progress = Math.round(
              (event['loaded'] / event['total']) * 100
            );
          }
          if (event['body']) {
            this.title.nativeElement.innerHTML = event['body'].message;

            setTimeout(() => window.location.reload(), 1300);
          }
        },
        (err) => {
          alert('Something went wrong please try again');
        }
      );
  };

  ngOnInit(): void {
    this.User.isLoggedIn$.subscribe((result) => {
      this.isAuth = result;
      setTimeout(() => (this.loaded = true), 600);
    });
  }
}
