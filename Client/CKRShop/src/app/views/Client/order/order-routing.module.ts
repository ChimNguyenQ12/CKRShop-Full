import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'My Order',
    },
    children: [
      {
        path: '',
        redirectTo: 'order',
      },
      {
        path: 'order',
        component: OrderComponent,
        data: {
          title: 'My Order',
        },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule { }

