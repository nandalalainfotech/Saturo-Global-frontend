import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-unit-lvalue',
  templateUrl: './unit-lvalue.component.html',
  styleUrls: ['./unit-lvalue.component.css']
})
export class UnitLvalueComponent implements OnInit {

  public UnitLowendForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  unitLvalue: string = "";



  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor( private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,) { }

  ngOnInit(): void {
    this.UnitLowendForm = this.formBuilder.group({
      unitLvalue: ['', Validators.required],
    });
  }


  get f() { return this.UnitLowendForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onUnitUnitHigendvalueClick(event: any, UnitLowendForm: any) {
    this.markFormGroupTouched(this.UnitLowendForm);
    this.submitted = true;
    if (this.UnitLowendForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.UnitLowendForm.reset();
  }
}
