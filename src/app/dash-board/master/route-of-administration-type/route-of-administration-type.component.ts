import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-route-of-administration-type',
  templateUrl: './route-of-administration-type.component.html',
  styleUrls: ['./route-of-administration-type.component.css']
})
export class RouteOfAdministrationTypeComponent implements OnInit {

  public ROAtypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  
 

  rourouteAdmin: string = "";

 

  

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.ROAtypeForm = this.formBuilder.group({

    
      routeAdmin: ['', Validators.required],
      
    });

   
  }


  get f() { return this.ROAtypeForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onROAtypeFormClick(event: any, ToxixtytypeForm: any) {
    this.markFormGroupTouched(this.ROAtypeForm);
    this.submitted = true;
    if (this.ROAtypeForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.ROAtypeForm.reset();
  }

}
