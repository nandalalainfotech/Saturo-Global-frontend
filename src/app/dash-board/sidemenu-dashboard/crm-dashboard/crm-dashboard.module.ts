import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { CrmDashboardRoutingModule } from './crm-dashboard-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CrmDashboardRoutingModule,
    NgApexchartsModule,
    // PerfectScrollbarModule,
  ]
})
export class CrmDashboardModule { }
