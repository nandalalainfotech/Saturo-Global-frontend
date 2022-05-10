import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-assay-type',
  templateUrl: './assay-type.component.html',
  styleUrls: ['./assay-type.component.css']
})
export class AssayTypeComponent implements OnInit {

  public AssaytypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  assayType: string = "";

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.AssaytypeForm = this.formBuilder.group({
      assayType: ['', Validators.required], 
    });
  }

  get f() { return this.AssaytypeForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onAssaytypeClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.AssaytypeForm);
    this.submitted = true;
    if (this.AssaytypeForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.AssaytypeForm.reset();
  }

}
