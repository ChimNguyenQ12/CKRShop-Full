import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTrashComponent } from './users-trash.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'User Trash',
    },
    children: [
      {
        path: '',
        redirectTo: 'user-trash',
      },
      {
        path: 'user-trash',
        component: UserTrashComponent, canActivate: [AuthService],
        data: {
          title: 'User Trash',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserTrashRoutingModule { }

