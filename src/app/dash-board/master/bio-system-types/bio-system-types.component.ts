import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-bio-system-types',
  templateUrl: './bio-system-types.component.html',
  styleUrls: ['./bio-system-types.component.css']
})
export class BioSystemTypesComponent implements OnInit {

  public BioSystemTypesForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  bioSystemTypes: string = "";

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.BioSystemTypesForm = this.formBuilder.group({
      bioSystemTypes: ['', Validators.required], 
    });
  }


  get f() { return this.BioSystemTypesForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onbioSystemClick(event: any, BioSystemTypesForm: any) {
    this.markFormGroupTouched(this.BioSystemTypesForm);
    this.submitted = true;
    if (this.BioSystemTypesForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.BioSystemTypesForm.reset();
  }

}
