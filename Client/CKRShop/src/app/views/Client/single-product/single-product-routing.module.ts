
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductComponent } from '../../Client/single-product/single-product.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    component: SingleProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SingleProductRoutingModule { }

