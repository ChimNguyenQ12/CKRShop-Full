
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Products',
    },
    component: HomePageComponent,
    children: [
      {
        path: '',
        component: HomePageComponent,
        data: {
          title: 'HomePage',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }

