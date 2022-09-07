import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { OrdersPackedComponent } from './orders-packed.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Order',
    },
    children: [
      {
        path: '',
        redirectTo: 'order',
      },
      {
        path: 'order',
        component: OrdersPackedComponent, canActivate: [AuthService],
        data: {
          title: 'Order',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPackedRoutingModule { }

