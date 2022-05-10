import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-unit-svalue',
  templateUrl: './unit-svalue.component.html',
  styleUrls: ['./unit-svalue.component.css']
})
export class UnitSvalueComponent implements OnInit {

  public UnitSingleForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  unitSvalue: string = "";



  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.UnitSingleForm = this.formBuilder.group({
      unitSvalue: ['', Validators.required],
    });
  }


  get f() { return this.UnitSingleForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onUnitSinglevalueClick(event: any, UnitSingleForm: any) {
    this.markFormGroupTouched(this.UnitSingleForm);
    this.submitted = true;
    if (this.UnitSingleForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.UnitSingleForm.reset();
  }
}
