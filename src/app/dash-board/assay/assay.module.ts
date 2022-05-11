import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssayRoutingModule } from './assay-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AgGridModule } from 'ag-grid-angular';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { UnitHighEndValueManager } from 'src/app/shared/services/restcontroller/bizservice/UnitHighEndValue.service';
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssayRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ],
  providers: [AssayManager,
    LigandManager,
    AssayTypeManager,
    ToxicityManager,
    RouteofAdminManager,
    UnitSingleValueManager,
    UnitHighEndValueManager,
    UnitlowendvalueManager]
})
export class AssayModule { }
