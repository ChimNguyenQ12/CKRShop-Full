import { AdvertisementsComponent } from './advertisements.component';
import { AdvertisementDialogComponent } from './advertisement-dialog/advertisement-dialog.component'
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Advertisement',
    },
    children: [
      {
        path: '',
        redirectTo: 'advertisement',
      },
      {
        path: 'advertisement',
        component: AdvertisementsComponent, canActivate: [AuthService],
        data: {
          title: 'Advertisement',
        },
      },
      {
        path: 'add-advertisement',
        component: AdvertisementDialogComponent,
        data: {
          title: 'Add-Advertisement',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisementRoutingModule { }

