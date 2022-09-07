import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { OrdersDeliveredComponent } from './orders-delivered.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order Delivered',
    },
    children: [
      {
        path: '',
        redirectTo: 'order-delivered',
      },
      {
        path: 'order-delivered',
        component: OrdersDeliveredComponent, canActivate: [AuthService],
        data: {
          title: 'Order Delivered',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderDeliveredRoutingModule { }

