import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersConfirmedComponent } from './orders-confirmed.component';
import { AuthService } from './../../../Services-Admin/services-auth/auth.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order Confirmed',
    },
    children: [
      {
        path: '',
        redirectTo: 'order-confirmed',
      },
      {
        path: 'order-confirmed',
        component: OrdersConfirmedComponent, canActivate: [AuthService],
        data: {
          title: 'Order Confirmed',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderConfirmedRoutingModule { }

