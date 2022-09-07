import { ImageTypesComponent } from './image-types.component';
import { ImageTypeDialogComponent } from './image-type-dialog/image-type-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'ImageType',
    },
    children: [
      {
        path: '',
        redirectTo: 'image-type',
      },
      {
        path: 'image-type',
        component: ImageTypesComponent, canActivate: [AuthService],
        data: {
          title: 'Image-Type',
        },
      },
      {
        path: 'add-imagetype',
        component: ImageTypeDialogComponent,
        data: {
          title: 'Add-ImageType',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageTypeRoutingModule { }

