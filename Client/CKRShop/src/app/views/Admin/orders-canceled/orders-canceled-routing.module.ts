import { AuthService } from './../../../Services-Admin/services-auth/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersCanceledComponent } from './orders-canceled.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order Cancelled',
    },
    children: [
      {
        path: '',
        redirectTo: 'order-cancelled',
      },
      {
        path: 'order-cancelled',
        component: OrdersCanceledComponent, canActivate: [AuthService],
        data: {
          title: 'Order Cancelled',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderCanceledRoutingModule { }

