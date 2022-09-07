import { CategoriesComponent } from './categories.component';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Category',
    },
    children: [
      {
        path: '',
        redirectTo: 'category',
      },
      {
        path: 'category',
        component: CategoriesComponent, canActivate: [AuthService],
        data: {
          title: 'Category',
        },
      },
      {
        path: 'add-category',
        component: CategoryDialogComponent,
        data: {
          title: 'Add-Category',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule { }

