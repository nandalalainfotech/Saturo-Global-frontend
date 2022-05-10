import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-ligand-version',
  templateUrl: './ligand-version.component.html',
  styleUrls: ['./ligand-version.component.css']
})
export class LigandVersionComponent implements OnInit {

  public LigandversionForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandVersion: number | any;

 

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  constructor( 
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,) 
    
    { 

      
    }

  ngOnInit(): void {

    

    this.LigandversionForm = this.formBuilder.group({

    
      ligandVersion: ['', Validators.required],
      
    });



   
  }


  get f() { return this.LigandversionForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onLigandversionClick(event: any, LigandversionForm: any) {
    this.markFormGroupTouched(this.LigandversionForm);
    this.submitted = true;
    if (this.LigandversionForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.LigandversionForm.reset();
  }

}
