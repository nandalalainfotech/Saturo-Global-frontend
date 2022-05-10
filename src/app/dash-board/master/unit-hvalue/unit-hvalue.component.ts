import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-unit-hvalue',
  templateUrl: './unit-hvalue.component.html',
  styleUrls: ['./unit-hvalue.component.css']
})
export class UnitHvalueComponent implements OnInit {

  public UnitHigendForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  unitHvalue: string = "";



  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.UnitHigendForm = this.formBuilder.group({
      unitHvalue: ['', Validators.required],
    });
  }


  get f() { return this.UnitHigendForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onUnitUnitHigendvalueClick(event: any, UnitHigendForm: any) {
    this.markFormGroupTouched(this.UnitHigendForm);
    this.submitted = true;
    if (this.UnitHigendForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.UnitHigendForm.reset();
  }

}
