import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssayRoutingModule } from './assay-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ],
  providers: [AssayManager]
})
export class AssayModule { }
