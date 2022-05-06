import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  public MeasurementForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  dataLocator: number | any;
  category: string = "";
  function: string = "";
  parameter: number | any;
  parameterDetail: string = ""; 
  singleValue: number | any;
  unit: string = "";
  originalPrefix:  string = "";
  highEndValue: number | any;
  lowEndValue: number | any;
  units: string = "";
  nonNumeric: string = "";
  remark: string = "";
  type: string = "";
  cell: number | any;
  cellDetail: string = "";
  organ: string = "";
  organDetail: string = "";
  species: string = "";
  speciesDetail: string = "";
  gender:  string = "";
  ageGroup:  string = "";

  hexToRgb: any;
  rgbToHex: any;

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private authManager: AuthManager, private formBuilder: FormBuilder, private http: HttpClient) { 

    const rowData = this.getJSON().subscribe(data => {
      console.log(data);
      if (data.length > 0) {
        console.log(this.rowData, "data")
        this.gridOptions?.api?.setRowData(data);
      }
      else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
    
  }

  ngOnInit(): void {

    this.createDataGrid001();

    this.MeasurementForm = this.formBuilder.group({

      dataLocator: ['', Validators.required],
      category: ['', Validators.required],
      function: ['', Validators.required],
      parameter: ['', Validators.required],
      parameterDetail: ['', Validators.required],
      singleValue: ['', Validators.required],
      unit: ['', Validators.required],
      originalPrefix: ['', Validators.required],
      highEndValue: ['', Validators.required],
      lowEndValue: ['', Validators.required],
      units: ['', Validators.required],
      nonNumeric: ['', Validators.required],
      remark: ['', Validators.required],
      type: ['', Validators.required],
      cell: ['', Validators.required],
      cellDetail: ['', Validators.required],
      organ: ['', Validators.required],
      organDetail: ['', Validators.required],
      species: ['', Validators.required],
      speciesDetail: ['', Validators.required],
      gender: ['', Validators.required],
      ageGroup: ['', Validators.required],
      
    });


    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


  }


  createDataGrid001(): void {
    this.gridOptions = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions.editType = 'fullRow';
    this.gridOptions.enableRangeSelection = true;
    this.gridOptions.animateRows = true;
    this.gridOptions.columnDefs = [
      {
        headerName: 'Data-locator',
        field: 'dataLocator',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Category',
        field: 'category',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Function',
        field: 'function',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Parameter',
        field: 'parameter',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Parameter-detail',
        field: 'parameterDetail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Original-value(Single-value)',
        field: 'singleValue',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit',
        field: 'unit',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Original-prefix',
        field: 'originalPrefix',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Original-value(High-end-value)',
        field: 'highEndValue',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Original-value(Low-end-value)',
        field: 'lowEndValue',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Unit',
        field: 'units',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Original-value(Non-numeric-value)',
        field: 'nonNumeric',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Remarks',
        field: 'remark',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Type',
        field: 'type',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Cell',
        field: 'cell',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Cell-detail',
        field: 'cellDetail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Organ',
        field: 'organ',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Organ-detail',
        field: 'organDetail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Species',
        field: 'species',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Species-detail',
        field: 'speciesDetail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Gender',
        field: 'gender',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Age-group',
        field: 'ageGroup',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
    ];
  }


  public getJSON(): Observable<any> {
    return this.http.get("./assets/json/measurement.json");
  }

  get f() { return this.MeasurementForm.controls; }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });

  }

  onMeasurementClick(event: any, MeasurementForm: any) {
    this.markFormGroupTouched(this.MeasurementForm);
    this.submitted = true;
    if (this.MeasurementForm.invalid) {
      return;
    }



  }

  onReset() {
    this.submitted = false;
    this.MeasurementForm.reset();
  }

}
