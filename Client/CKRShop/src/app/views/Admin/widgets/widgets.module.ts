import { WidgetsDropdownOrderComponent } from './widgets-dropdown-order/widgets-dropdown-order.component';
import { WidgetsDropdownCommentComponent } from './widgets-dropdown-comment/widgets-dropdown-comment.component';
import { WidgetsDropdownUserComponent } from './widgets-dropdown-user/widgets-dropdown-user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  CardModule,
  DropdownModule,
  GridModule,
  ProgressModule,
  SharedModule,
  WidgetModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { DocsComponentsModule } from '@docs-components/docs-components.module';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetsBrandComponent } from './widgets-brand/widgets-brand.component';
import { ChartSample, WidgetsDropdownComponent } from './widgets-dropdown-product/widgets-dropdown.component';
import { WidgetsEComponent } from './widgets-e/widgets-e.component';
@NgModule({
  declarations: [
    WidgetsComponent,
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    ChartSample,
    WidgetsEComponent,
    WidgetsDropdownUserComponent,
    WidgetsDropdownCommentComponent,
    WidgetsDropdownOrderComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    GridModule,
    WidgetModule,
    IconModule,
    DropdownModule,
    SharedModule,
    ButtonModule,
    CardModule,
    DocsComponentsModule,
    ProgressModule,
    ChartjsModule
  ],
  exports: [
    WidgetsBrandComponent,
    WidgetsDropdownComponent,
    WidgetsDropdownUserComponent,
    WidgetsDropdownCommentComponent,
    WidgetsDropdownOrderComponent
  ]
})
export class WidgetsModule {
}
