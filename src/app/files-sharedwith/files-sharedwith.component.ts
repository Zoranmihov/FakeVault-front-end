import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-files-sharedwith',
  templateUrl: './files-sharedwith.component.html',
  styleUrls: ['./files-sharedwith.component.css'],
})
export class FilesSharedwithComponent implements OnInit {
  constructor(private http: HttpClient) {}
  data: any;
  loaded = false;
  progress: any;

  @ViewChild('downloadModal') downloadModal!: ElementRef;

  unfollow(name: string, description: string, by_user: string) {
    let answer = window.confirm(
      'Are you sure you want to unshare the file with this user?'
    );
    if (answer) {
      let requestedFile = {
        name,
        description,
        by_user,
      };
      this.http
        .post('https://fake-vault-back-end.herokuapp.com/api/unfollow', requestedFile, {
          withCredentials: true,
        })
        .subscribe(
          (res: any) => {
            window.location.reload();
          },
          (err) => alert('Something went wrong please try again')
        );
    } else {
      return;
    }
  }

  downloadFile(name: string, description: string) {
    let requestedFile = {
      name,
      description,
      shared_file: true,
    };

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
            this.progress = Math.round((res['loaded'] / res['total']) * 100);
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
          console.log(err);
        }
      );
  }

  ngOnInit(): void {
    this.http
      .get('https://fake-vault-back-end.herokuapp.com/api/filessharedwith', {
        withCredentials: true,
      })
      .subscribe(
        (res: object) => {
          this.data = res;
          this.data = this.data.files;

          if (this.data.length < 1) {
            this.data = false;
          }
          console.log(this.data);
          this.loaded = true;
        },
        (err) => console.log(err)
      );
  }
}
