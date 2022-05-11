import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  MeasurementForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  measurementId: number | any;
  dataLocator: number | any;
  categorySlno: number | any;
  functionSlno: number | any;
  parameter: string = "";
  parameterDetail: string = "";
  singleValue: string = "";
  unit: string = "";
  originalPrefixSlno: number | any;
  highEndValue: string = "";
  lowEndValue: string = "";
  units: string = "";
  nonNumeric: string = "";
  remark: string = "";
  typeSlno: number | any;
  cell: string = "";
  cellDetail: string = "";
  organ: string = "";
  organDetail: string = "";
  species: string = "";
  speciesDetail: string = "";
  genderSlno: number | any;
  ageGroup: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  measurement: Measurement001wb[] = [];

  hexToRgb: any;
  rgbToHex: any;

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;

  constructor(private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private calloutService: CalloutService,
    private modalService: NgbModal,
    private measurementManager: MeasurementManager,) { }

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


  loadData() {
    this.measurementManager.allmeasurement().subscribe(response => {
      this.measurement = deserialize<Measurement001wb[]>(Measurement001wb, response);
      if (this.measurement.length > 0) {
        this.gridOptions?.api?.setRowData(this.measurement);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }

  get f() { return this.MeasurementForm.controls; }

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
      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onEditButtonClick.bind(this),
          label: 'Edit'
        },
      },
      {
        headerName: 'Delete',
        cellRenderer: 'iconRenderer',
        width: 85,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onDeleteButtonClick.bind(this),
          label: 'Delete'
        },
      },
      {
        headerName: 'Audit',
        cellRenderer: 'iconRenderer',
        width: 80,
        flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      }

    ];
  }

  onEditButtonClick(params: any) {
    this.measurementId = params.data.measurementId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.MeasurementForm.patchValue({
      'measurementId': params.data.measurementId,
      'dataLocator': params.data.dataLocator,
      'categorySlno': params.data.categorySlno,
      'functionSlno': params.data.functionSlno,
      'parameter': params.data.parameter,
      'parameterDetail': params.data.parameterDetail,
      'singleValue': params.data.singleValue,
      'unit': params.data.unit,
      'originalPrefixSlno': params.data.originalPrefixSlno,
      'highEndValue': params.data.highEndValue,
      'lowEndValue': params.data.lowEndValue,
      'units': params.data.units,
      'nonNumeric': params.data.nonNumeric,
      'remark': params.data.remark,
      'typeSlno': params.data.typeSlno,
      'cell': params.data.cell,
      'cellDetail': params.data.cellDetail,
      'organ': params.data.organ,
      'organDetail': params.data.organDetail,
      'species': params.data.species,
      'speciesDetail': params.data.speciesDetail,
      'genderSlno': params.data.genderSlno,
      'ageGroup': params.data.ageGroup,

    });
  }
  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Measurement";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.measurementManager.measurementdelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.measurement.length; i++) {
            if (this.measurement[i].measurementId == params.data.measurementId) {
              this.measurement?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Measurement Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Measurement";
    modalRef.componentInstance.details = params.data;
  }
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

    let measurement001wb = new Measurement001wb();
    measurement001wb.measurementId = this.f.measurementId.value ? this.f.measurementId.value : "";
    measurement001wb.dataLocator = this.f.dataLocator.value ? this.f.dataLocator.value : "";
    measurement001wb.categorySlno = this.f.categorySlno.value ? this.f.categorySlno.value : "";
    measurement001wb.functionSlno = this.f.functionSlno.value ? this.f.functionSlno.value : "";
    measurement001wb.parameter = this.f.parameter.value ? this.f.parameter.value : "";
    measurement001wb.parameterDetail = this.f.parameterDetail.value ? this.f.parameterDetail.value : "";
    measurement001wb.singleValue = this.f.singleValue.value ? this.f.singleValue.value : "";
    measurement001wb.unit = this.f.unit.value ? this.f.unit.value : "";
    measurement001wb.originalPrefixSlno = this.f.originalPrefixSlno.value ? this.f.originalPrefixSlno.value : "";
    measurement001wb.highEndValue = this.f.highEndValue.value ? this.f.highEndValue.value : "";
    measurement001wb.lowEndValue = this.f.lowEndValue.value ? this.f.lowEndValue.value : "";
    measurement001wb.units = this.f.units.value ? this.f.units.value : "";
    measurement001wb.nonNumeric = this.f.nonNumeric.value ? this.f.nonNumeric.value : "";
    measurement001wb.remark = this.f.remark.value ? this.f.remark.value : "";
    measurement001wb.typeSlno = this.f.typeSlno.value ? this.f.typeSlno.value : "";
    measurement001wb.cell = this.f.cell.value ? this.f.cell.value : "";
    measurement001wb.cellDetail = this.f.cellDetail.value ? this.f.cellDetail.value : "";
    measurement001wb.organ = this.f.organ.value ? this.f.organ.value : "";
    measurement001wb.organDetail = this.f.organDetail.value ? this.f.organDetail.value : "";
    measurement001wb.species = this.f.species.value ? this.f.species.value : "";
    measurement001wb.speciesDetail = this.f.speciesDetail.value ? this.f.speciesDetail.value : "";
    measurement001wb.genderSlno = this.f.genderSlno.value ? this.f.genderSlno.value : "";
    measurement001wb.ageGroup = this.f.ageGroup.value ? this.f.ageGroup.value : "";



    if (this.measurementId) {
      measurement001wb.measurementId = this.measurementId;
      measurement001wb.insertUser = this.insertUser;
      measurement001wb.insertDatetime = this.insertDatetime;
      measurement001wb.updatedUser = this.authManager.getcurrentUser.username;
      measurement001wb.updatedDatetime = new Date();
      this.measurementManager.measurementupdate(measurement001wb).subscribe((response) => {
        this.calloutService.showSuccess("Measurement Details Updated Successfully");
        this.loadData();
        this.MeasurementForm.reset();
        this.measurementId = null;
        this.submitted = false;
      });
    }
    else {
      measurement001wb.insertUser = this.authManager.getcurrentUser.username;
      measurement001wb.insertDatetime = new Date();
      this.measurementManager.measurementsave(measurement001wb).subscribe((response) => {
        this.calloutService.showSuccess("Measurement Details Saved Successfully");
        this.loadData();
        this.MeasurementForm.reset();
        this.submitted = false;
      });
    }


  }

  onReset() {
    this.submitted = false;
    this.MeasurementForm.reset();
  }

}
