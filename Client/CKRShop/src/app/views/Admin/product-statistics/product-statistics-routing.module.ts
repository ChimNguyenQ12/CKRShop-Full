import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';

import { ProductStatisticsComponent } from './product-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: ProductStatisticsComponent, canActivate: [AuthService],
    data: {
      title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductStatisticsRoutingModule {
}
