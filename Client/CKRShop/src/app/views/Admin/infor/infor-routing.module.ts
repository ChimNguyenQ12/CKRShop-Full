import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InforComponent } from './infor.component';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Information',
    },
    children: [
      {
        path: '',
        redirectTo: 'infor',
      },
      {
        path: 'infor',
        component: InforComponent, canActivate: [AuthService],
        data: {
          title: 'Information',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InforRoutingModule { }

