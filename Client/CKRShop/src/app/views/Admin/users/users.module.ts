import { ResetPasswordDialogComponent } from './reset-password-dialog/reset-password-dialog.component';
import { RegisterAdminDialogComponent } from './register-admin-dialog/register-admin.component';
import { UsersComponent } from './Users.component';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
// CoreUI Modules
import {
  AccordionModule,
  ButtonModule,
  CardModule,
  CollapseModule,
  DropdownModule,
  GridModule,
  ListGroupModule,
  NavModule,
  PaginationModule,
  PlaceholderModule,
  ProgressModule,
  SharedModule,
  TableModule,
  TabsModule,
  TooltipModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule } from '@coreui/icons-angular';
// views
import { UserDialogComponent } from './user-dialog/user-dialog.component';

// Components Routing
import { UserRoutingModule } from './users-routing.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserUpdateDialogComponent } from './user-update-dialog/user-update-dialog.component';
@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    AccordionModule,
    ButtonModule,
    CardModule,
    CollapseModule,
    GridModule,
    UtilitiesModule,
    SharedModule,
    ListGroupModule,
    IconModule,
    ListGroupModule,
    PlaceholderModule,
    ProgressModule,
    TabsModule,
    NavModule,
    TooltipModule,
    DropdownModule,
    PaginationModule,
    TableModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  declarations: [
    UsersComponent,
    UserDialogComponent,
    UserUpdateDialogComponent,
    RegisterAdminDialogComponent,
    ResetPasswordDialogComponent
  ],
})
export class UserModule { }
