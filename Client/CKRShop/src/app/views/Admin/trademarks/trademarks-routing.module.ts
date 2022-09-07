import { TrademarksComponent } from './trademarks.component';
import { TrademarkDialogComponent } from './trademark-dialog/trademark-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trademark',
    },
    children: [
      {
        path: '',
        redirectTo: 'Trademark',
      },
      {
        path: 'trademark',
        component: TrademarksComponent, canActivate: [AuthService],
        data: {
          title: 'Trademark',
        },
      },
      {
        path: 'add-trademark',
        component: TrademarkDialogComponent,
        data: {
          title: 'Add-Trademark',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrademarkRoutingModule { }

