import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InforComponent } from '../../Client/infor/infor.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forgot Password',
    },
    children: [
      {
        path: '',
        redirectTo: 'infor',
      },
      {
        path: 'infor',
        component: InforComponent,
        data: {
          title: 'Forgot Password',
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

