import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-category-functions',
  templateUrl: './category-functions.component.html',
  styleUrls: ['./category-functions.component.css']
})
export class CategoryFunctionsComponent implements OnInit {

  public CategoryFunctionForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  categoryFunction: string = "";

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.CategoryFunctionForm = this.formBuilder.group({
      categoryFunction: ['', Validators.required],
    });
  }

  get f() { return this.CategoryFunctionForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  oncategoryFunctionClick(event: any, CategoryFunctionForm: any) {
    this.markFormGroupTouched(this.CategoryFunctionForm);
    this.submitted = true;
    if (this.CategoryFunctionForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.CategoryFunctionForm.reset();
  }

}
