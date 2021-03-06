import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { appSettingManager } from '../shared/services/restcontroller/bizservice/app-settings.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { APiechartComponent } from './body/a-piechart/a-piechart.component';
import { BarchartComponent } from './body/barchart/barchart.component';
import { BodyChartComponent } from './body/body-chart/body-chart.component';
import { BodyComponent } from './body/body.component';
import { ChatBoxComponent } from './body/chat-box/chat-box.component';
import { ClientLoginComponent } from './body/client-login/client-login.component';
import { LogsComponent } from './body/logs/logs.component';
import { ProcessCardComponent } from './body/process-card/process-card.component';
import { ReviewComponent } from './body/review/review.component';
import { StatusOfSiteComponent } from './body/status-of-site/status-of-site.component';
import { TablesComponent } from './body/tables/tables.component';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SidemenuDashboardComponent } from './sidemenu-dashboard/sidemenu-dashboard.component';
// import { GoJsChartComponent } from './body/go-js-chart/go-js-chart.component';


// import {NgxCumulioComponent} from 'ngx-cumulio';


@NgModule({

    declarations: [
        DashBoardComponent,
        HeaderComponent,
        FooterComponent,
        SideMenuComponent,
        BodyComponent,
        BodyChartComponent,
        APiechartComponent,
        // BodyLineChartComponent,
        // BodyPiechartComponent,
        BarchartComponent,
        // BBarchartComponent,
        LogsComponent,
        StatusOfSiteComponent,
        ProcessCardComponent,
        // CardChartComponent,
        ChatBoxComponent,
        ClientLoginComponent,
        ReviewComponent,
        TablesComponent,
        SidemenuDashboardComponent,
        // RadarChartComponent,
        // ModernChartComponent,
        //  GoJsChartComponent



        // NgxCumulioComponent,
    ],

    imports: [
        FormsModule,
        // BarChartModule,
        LineChartModule,
        NgxChartsModule,
        ChartsModule,
        NgApexchartsModule,
        // D3Module, 
        // MatDividerModule,
        // MatToolbarModule,
        PerfectScrollbarModule,
        ProgressbarModule.forRoot(),
        RoundProgressModule,
        TranslateModule.forRoot(),

        MatMenuModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ColorPickerModule,
        DashboardRoutingModule
    ],
    providers: [DataSharedService, appSettingManager, UserManager],
    exports: [NgbCollapseModule],
})
export class DashboardModule { }

