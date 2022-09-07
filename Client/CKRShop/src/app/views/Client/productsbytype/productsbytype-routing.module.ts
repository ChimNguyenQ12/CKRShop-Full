
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsByTypeComponent } from '../productsbytype/productsbytype.component';
import { SingleProductComponent } from '../single-product/single-product.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    }, 
    pathMatch: 'full',
    component: ProductsByTypeComponent,
    children: [
      {
        path: '/:id',
        component: ProductsByTypeComponent,
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
export class ProductsByTypeRoutingModule { }

