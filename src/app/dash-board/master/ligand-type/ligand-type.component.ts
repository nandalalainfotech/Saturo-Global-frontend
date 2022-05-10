import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-ligand-type',
  templateUrl: './ligand-type.component.html',
  styleUrls: ['./ligand-type.component.css']
})
export class LigandTypeComponent implements OnInit {

  public LigandtypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandType: string = "";

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 
  constructor(

    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.LigandtypeForm = this.formBuilder.group({
      ligandVersion: ['', Validators.required],
    });

  }

  get f() { return this.LigandtypeForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onLigandtypeClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.LigandtypeForm);
    this.submitted = true;
    if (this.LigandtypeForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.LigandtypeForm.reset();
  }

}
