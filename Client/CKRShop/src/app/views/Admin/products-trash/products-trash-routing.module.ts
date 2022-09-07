import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductTrashComponent } from './products-trash.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product Trash',
    },
    children: [
      {
        path: '',
        redirectTo: 'product-trash',
      },
      {
        path: 'product-trash',
        component: ProductTrashComponent, canActivate: [AuthService],
        data: {
          title: 'Product Trash',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductTrashRoutingModule { }

