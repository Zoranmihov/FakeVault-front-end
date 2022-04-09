import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.css'],
})
export class MyfilesComponent implements OnInit {
  data: any;
  file: any;

  progress: any;
  userEmail = String;
  loaded = false;

  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('downloadModal') downloadModal!: ElementRef;
  @ViewChild('title') title!: ElementRef;
  @ViewChild('email') email!: ElementRef;

  constructor(private http: HttpClient) {}

  getEmail(event: any) {
    this.userEmail = event.target.value;
  }

  wait() {
    this.file.email = this.userEmail;
    this.http
      .post('https://fake-vault-back-end.herokuapp.com/api/sharefile', this.file, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.title.nativeElement.innerHTML = res.message;
          setTimeout(() => {
            this.email.nativeElement.value = '';
            this.modal.nativeElement.style.display = 'none';
            this.title.nativeElement.innerHTML = 'Share this file with:';
          }, 1500);
        },
        (err: any) => {
          this.title.nativeElement.innerHTML = err.error.message;
          this.email.nativeElement.value = '';
        }
      );
  }

  fileAction(name: string, description: string, action: string) {
    let requestedFile = {
      name: name,
      description: description,
    };
    switch (action) {
      case 'download':
        this.http
          .post('https://fake-vault-back-end.herokuapp.com/api/downloadfile', requestedFile, {
            withCredentials: true,
            responseType: 'blob',
            reportProgress: true,
            observe: 'events',
          })
          .subscribe(
            (res: any) => {
              this.downloadModal.nativeElement.style.display = 'block';
              if (res['loaded'] && res['total']) {
                this.progress = Math.round(
                  (res['loaded'] / res['total']) * 100
                );
              }
              if (res.type == 4) {
                this.downloadModal.nativeElement.style.display = 'none';
                const a = document.createElement('a');
                const objectUrl = URL.createObjectURL(res.body);
                a.href = objectUrl;
                a.download = res.type;
                a.click();
                URL.revokeObjectURL(objectUrl);
              }
            },
            (err) => {
              alert('Something went wrong please try again');
            }
          );
        break;

      case 'delete':
        this.http
          .post('https://fake-vault-back-end.herokuapp.com/api/deletefile', requestedFile, {
            withCredentials: true,
          })
          .subscribe(
            (res: any) => {
              alert(res.message);
              setTimeout(() => window.location.reload(), 1700);
            },
            (err) => {
              alert(err.message);
            }
          );
        break;

      case 'share':
        this.modal.nativeElement.style.display = 'block';
        this.file = requestedFile;
        break;
    }
  }

  closeModel() {
    this.modal.nativeElement.style.display = 'none';
    this.email.nativeElement.value = '';
  }

  ngOnInit(): void {
    this.http
      .get('https://fake-vault-back-end.herokuapp.com/api/myuploadedfiles', {
        withCredentials: true,
      })
      .subscribe(
        (res: object) => {
          this.data = res;
          this.data = this.data.files;
          if (this.data.length < 1) {
            this.data = false;
          }
          this.loaded = true;
        },
        (err) => ((this.loaded = true), (this.data = false))
      );
  }
}
