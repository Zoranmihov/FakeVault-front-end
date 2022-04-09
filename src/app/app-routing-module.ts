import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Guards
import { UserIsPresentGuard } from './guards/user-is-present.guard';

//Components
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MyfilesComponent } from './myfiles/myfiles.component';
import { MySharedFilesComponent } from './my-shared-files/my-shared-files.component';
import { FilesSharedwithComponent } from './files-sharedwith/files-sharedwith.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponentComponent,
  },
  {
    path: 'register',
    component: RegisterComponentComponent,
  },
  {
    path: 'login',
    component: LoginComponentComponent,
  },
  {
    path: 'myfiles',
    component: MyfilesComponent,
    canActivate: [UserIsPresentGuard],
  },
  {
    path: 'mysharedfiles',
    component: MySharedFilesComponent,
    canActivate: [UserIsPresentGuard],
  },
  {
    path: 'filessharedwith',
    component: FilesSharedwithComponent,
    canActivate: [UserIsPresentGuard],
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
