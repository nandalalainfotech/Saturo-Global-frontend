import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public CategoryForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  category: string = "";

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.CategoryForm = this.formBuilder.group({
      category: ['', Validators.required],
    });
  }

  get f() { return this.CategoryForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  oncategoryClick(event: any, CategoryForm: any) {
    this.markFormGroupTouched(this.CategoryForm);
    this.submitted = true;
    if (this.CategoryForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.CategoryForm.reset();
  }

}
