
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WishlistComponent } from '../wishlist/wishlist.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    component: WishlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistRoutingModule { }

