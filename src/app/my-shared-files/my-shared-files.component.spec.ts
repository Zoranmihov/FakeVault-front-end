import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySharedFilesComponent } from './my-shared-files.component';

describe('MySharedFilesComponent', () => {
  let component: MySharedFilesComponent;
  let fixture: ComponentFixture<MySharedFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MySharedFilesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MySharedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
