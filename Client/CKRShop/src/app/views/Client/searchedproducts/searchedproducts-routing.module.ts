
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchedProductsComponent } from '../searchedproducts/searchedproducts.component';
import { SingleProductComponent } from '../single-product/single-product.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    component: SearchedProductsComponent,
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
export class SearchedProductsRoutingModule { }

