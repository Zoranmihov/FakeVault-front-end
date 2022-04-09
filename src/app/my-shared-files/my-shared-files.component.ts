import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-shared-files',
  templateUrl: './my-shared-files.component.html',
  styleUrls: ['./my-shared-files.component.css'],
})
export class MySharedFilesComponent implements OnInit {
  constructor(private http: HttpClient) {}

  @ViewChild('title') title!: ElementRef;
  data: any;
  loaded = false;

  unShareFile(name: string, type: string, email: string) {
    let answer = window.confirm(
      'Are you sure you want to unshare the file with this user?'
    );
    if (answer) {
      let requestedFile = {
        name,
        type,
        email,
      };
      this.http
        .post('https://fake-vault-back-end.herokuapp.com/api/unsharefile', requestedFile, {
          withCredentials: true,
        })
        .subscribe(
          (res: any) => {
            this.title.nativeElement.innerHTML = res.message;
            setTimeout(() => window.location.reload(), 1800);
          },
          (err) => {
            this.title.nativeElement.innerHTML = err.error.message;
            setTimeout(
              () =>
                (this.title.nativeElement.innerHTML =
                  'Tip: You can click on the users email to stop sharing the file with the user'),
              1300
            );
          }
        );
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.http
      .get('https://fake-vault-back-end.herokuapp.com/api/mysharedfiles', { withCredentials: true })
      .subscribe(
        (res: object) => {
          this.data = res;
          this.data = this.data.files;
          if (this.data.length < 1) {
            this.data = false;
          }
          this.loaded = true;
        },
        (err) => {
          alert('Something went wrong, reloading page');
          window.location.reload();
        }
      );
  }
}
