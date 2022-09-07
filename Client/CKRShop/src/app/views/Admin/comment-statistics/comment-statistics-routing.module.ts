import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';

import { CommentStatisticsComponent } from './comment-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: CommentStatisticsComponent, canActivate: [AuthService],
    data: {
      title: $localize`Dashboard`
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentStatisticsRoutingModule {
}
