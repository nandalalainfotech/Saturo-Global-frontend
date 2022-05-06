import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LigandRoutingModule } from './ligand-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LigandRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ]
})
export class LigandModule { }
