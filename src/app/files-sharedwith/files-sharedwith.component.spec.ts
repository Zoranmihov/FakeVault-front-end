import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesSharedwithComponent } from './files-sharedwith.component';

describe('FilesSharedwithComponent', () => {
  let component: FilesSharedwithComponent;
  let fixture: ComponentFixture<FilesSharedwithComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesSharedwithComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesSharedwithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
