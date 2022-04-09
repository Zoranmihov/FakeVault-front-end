import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing-module';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';

//Services
import { UserService } from './services/user.service';

//Guards
import { UserIsPresentGuard } from './guards/user-is-present.guard';

//Components
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { NavComponent } from './nav/nav.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { MySharedFilesComponent } from './my-shared-files/my-shared-files.component';
import { FilesSharedwithComponent } from './files-sharedwith/files-sharedwith.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponentComponent,
    RegisterComponentComponent,
    LoginComponentComponent,
    NavComponent,
    MyfilesComponent,
    MySharedFilesComponent,
    FilesSharedwithComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressBarModule
  ],
  providers: [UserService, UserIsPresentGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
