import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { OrdersProcessingComponent } from './orders-processing.component';



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
        component: OrdersProcessingComponent, canActivate: [AuthService],
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
export class OrderProcessingRoutingModule { }

