import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { BBarchartComponent } from '../body/b-barchart/b-barchart.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { CrmDashboardComponent } from './crm-dashboard/crm-dashboard.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { PurchaseDashboardComponent } from './purchase-dashboard/purchase-dashboard.component';
import { SalesDashboardComponent } from './sales-dashboard/sales-dashboard.component';
import { SidemenuDashboardRoutingModule } from './sidemenu-dashboard-routing.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LogsComponent } from '../body/logs/logs.component';
import { APiechartComponent } from '../body/a-piechart/a-piechart.component';
import { BodyLineChartComponent } from '../body/body-line-chart/body-line-chart.component';
import { BodyPiechartComponent } from '../body/body-piechart/body-piechart.component';
import { ModernChartComponent } from '../body/modern-chart/modern-chart.component';
import { CardChartComponent } from '../body/card-chart/card-chart.component';
import { RadarChartComponent } from '../body/radar-chart/radar-chart.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    AccountsDashboardComponent,
    PurchaseDashboardComponent,
    CrmDashboardComponent,
    SalesDashboardComponent,
    BBarchartComponent,
    // APiechartComponent,
    // LogsComponent,
    BodyLineChartComponent,
    BodyPiechartComponent,
    ModernChartComponent,
    CardChartComponent,
    RadarChartComponent

  ],
  imports: [
    CommonModule,
    SidemenuDashboardRoutingModule,
    BarChartModule,
    NgApexchartsModule,
    ChartsModule
  ]
})
export class SidemenuDashboardModule { }
