import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { OrdersTransportedComponent } from './orders-transported.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order Transported',
    },
    children: [
      {
        path: '',
        redirectTo: 'order-transported',
      },
      {
        path: 'order-transported',
        component: OrdersTransportedComponent, canActivate: [AuthService],
        data: {
          title: 'Order Transported',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderTransportedRoutingModule { }

