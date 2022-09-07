import { HomePageComponent } from './../homepage/homepage.component';
import { IndexComponent } from './../index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../products/products.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Index',
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
      },
      {
        path: 'home',
        component: HomePageComponent,
        data: {
          title: 'Index',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }

