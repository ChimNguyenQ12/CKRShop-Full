
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../../Client/products/products.component';
import { SingleProductComponent } from '../single-product/single-product.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    component: ProductsComponent,
    children: [
      {
        path: '/:id',
        component: SingleProductComponent,
        data: {
          title: 'Products',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }

