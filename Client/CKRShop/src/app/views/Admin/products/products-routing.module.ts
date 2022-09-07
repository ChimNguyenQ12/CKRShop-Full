import { ProductsComponent } from './products.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Product',
    },
    children: [
      {
        path: '',
        redirectTo: 'product',
      },
      {
        path: 'product',
        component: ProductsComponent, canActivate: [AuthService],
        data: {
          title: 'Product',
        },
      },
      {
        path: 'add-product',
        component: ProductDialogComponent,
        data: {
          title: 'Add-Product',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule { }

