import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/Services-Admin/services-auth/auth.service';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { CommentsComponent } from './comments.component';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Comment',
    },
    children: [
      {
        path: '',
        redirectTo: 'comment',
      },
      {
        path: 'comment',
        component: CommentsComponent, canActivate: [AuthService],
        data: {
          title: 'Comment',
        },
      },
      {
        path: 'add-category',
        component: CommentDialogComponent,
        data: {
          title: 'Add-Comment',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentRoutingModule { }

