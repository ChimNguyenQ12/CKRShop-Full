import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  AvatarModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  FormModule,
  GridModule,
  NavModule,
  ProgressModule,
  TableModule,
  TabsModule
} from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';

import { UserStatisticsRoutingModule } from './user-statistics-routing.module';
import { UserStatisticsComponent } from './user-statistics.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { WidgetsModule } from '../widgets/widgets.module';

@NgModule({
  imports: [
    NgxChartsModule,
    UserStatisticsRoutingModule,
    CardModule,
    NavModule,
    IconModule,
    TabsModule,
    CommonModule,
    GridModule,
    ProgressModule,
    ReactiveFormsModule,
    ButtonModule,
    FormModule,
    ButtonModule,
    ButtonGroupModule,
    ChartjsModule,
    AvatarModule,
    TableModule,
    WidgetsModule
  ],
  declarations: [UserStatisticsComponent]
})
export class UserStatisticsModule {
}
