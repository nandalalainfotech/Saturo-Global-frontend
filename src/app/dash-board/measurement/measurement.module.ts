import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeasurementRoutingModule } from './measurement-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MeasurementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [MeasurementManager]
})
export class MeasurementModule { }
