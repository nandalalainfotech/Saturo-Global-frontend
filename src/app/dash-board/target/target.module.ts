import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TargetRoutingModule } from './target-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TargetRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class TargetModule { }
