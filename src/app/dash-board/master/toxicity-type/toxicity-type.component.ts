import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-toxicity-type',
  templateUrl: './toxicity-type.component.html',
  styleUrls: ['./toxicity-type.component.css']
})
export class ToxicityTypeComponent implements OnInit {

  public ToxixtytypeForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  toxicityType: string = "";

  
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

 

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.ToxixtytypeForm = this.formBuilder.group({
      toxicityType: ['', Validators.required],
    });
  }


  get f() { return this.ToxixtytypeForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onToxixtytypeClick(event: any, ToxixtytypeForm: any) {
    this.markFormGroupTouched(this.ToxixtytypeForm);
    this.submitted = true;
    if (this.ToxixtytypeForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.ToxixtytypeForm.reset();
  }
}
