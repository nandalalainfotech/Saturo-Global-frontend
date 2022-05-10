import { CdkStepperModule } from '@angular/cdk/stepper';
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
import { AgGridModule } from 'ag-grid-angular';
import { NgStepperModule } from 'angular-ng-stepper';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsModule } from 'ng2-charts';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { ColorPickerModule } from 'ngx-color-picker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { appSettingManager } from '../shared/services/restcontroller/bizservice/app-settings.service';
import { LigandManager } from '../shared/services/restcontroller/bizservice/ligandManager.service';
import { UserManager } from '../shared/services/restcontroller/bizservice/user.service';
import { DataSharedService } from '../shared/services/services/datashared.service';
import { AssayComponent } from './assay/assay.component';
import { DashboardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './dash-board.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LigandComponent } from './ligand/ligand.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StepperComponent } from './stepper/stepper.component';
import { TargetComponent } from './target/target.component';
// import { GoJsChartComponent } from './body/go-js-chart/go-js-chart.component';


// import {NgxCumulioComponent} from 'ngx-cumulio';


@NgModule({

    declarations: [
        DashBoardComponent,
        HeaderComponent,
        FooterComponent,
        SideMenuComponent,
        LigandComponent,
        TargetComponent,
        AssayComponent,
        MeasurementComponent,
        StepperComponent,
        // MasterComponent,
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
        AgGridModule.withComponents([]),
        MatMenuModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatTabsModule,
        ColorPickerModule,
        DashboardRoutingModule,
        CdkStepperModule,
        NgStepperModule
    ],
    providers: [DataSharedService, appSettingManager, UserManager, LigandManager],
    exports: [NgbCollapseModule],
})
export class DashboardModule { }

