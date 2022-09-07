import { UsersComponent } from './Users.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User',
    },
    children: [
      {
        path: '',
        redirectTo: 'user',
      },
      {
        path: 'user',
        component: UsersComponent, canActivate: [AuthService],
        data: {
          title: 'User',
        },
      },
      {
        path: 'add-user',
        component: UserDialogComponent,
        data: {
          title: 'Add-User',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

