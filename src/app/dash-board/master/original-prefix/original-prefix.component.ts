import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';

@Component({
  selector: 'app-original-prefix',
  templateUrl: './original-prefix.component.html',
  styleUrls: ['./original-prefix.component.css']
})
export class OriginalPrefixComponent implements OnInit {

  public OriginalPrefixForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  OriginalPrefix: string = "";

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    
    this.OriginalPrefixForm = this.formBuilder.group({
      OriginalPrefix: ['', Validators.required],
    });
  }

  get f() { return this.OriginalPrefixForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onOrginialPrefixClick(event: any, OriginalPrefixForm: any) {
    this.markFormGroupTouched(this.OriginalPrefixForm);
    this.submitted = true;
    if (this.OriginalPrefixForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.OriginalPrefixForm.reset();
  }

}
