import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-assay',
  templateUrl: './assay.component.html',
  styleUrls: ['./assay.component.css']
})
export class AssayComponent implements OnInit {
  AssayForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  assayId: number | any;
  ligandVersionSlno: number | any;
  ordinal: string = "";
  collectionId: string = "";
  assayTypeSlno: number | any;
  toxiCitySlno: number | any;
  routeSlno: number | any;
  ligandSvalue: string = "";
  LigandHvalue: string = "";
  LigandLvalue: string = "";
  unitsSlno: number | any;
  unitSlno: number | any;
  administration: string = "";
  procedure: string = "";
  target: string = "";
  conditionType: string = "";
  conditionMaterial: string = "";
  conditionMaterialid: string = "";
  value: string = "";
  unitedSlno: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  assay: Assay001wb[] = [];

  hexToRgb: any;
  rgbToHex: any;
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;


  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private http: HttpClient,
    private modalService: NgbModal,
    private assayManager: AssayManager,) { }

  ngOnInit(): void {


    this.AssayForm = this.formBuilder.group({
      ligandVersion: ['', Validators.required],
      ordinal: ['', Validators.required],
      collectionId: ['', Validators.required],
      assayType: ['', Validators.required],
      toxiCity: ['', Validators.required],
      route: ['', Validators.required],
      ligandSvalue: ['', Validators.required],
      LigandHvalue: ['', Validators.required],
      LigandLvalue: ['', Validators.required],
      Unit: ['', Validators.required],
      Units: ['', Validators.required],
      Administration: ['', Validators.required],
      Procedure: ['', Validators.required],
      Target: ['', Validators.required],
      Conditiontype: ['', Validators.required],
      Conditionmaterial: ['', Validators.required],
      Conditionmaterialid: ['', Validators.required],
      value: ['', Validators.required],
      united: ['', Validators.required],
    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });

    this.createDataGrid001();




  }

  loadData() {
    this.assayManager.allassay().subscribe(response => {
      this.assay = deserialize<Assay001wb[]>(Assay001wb, response);
      if (this.assay.length > 0) {
        this.gridOptions?.api?.setRowData(this.assay);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }



  get f() { return this.AssayForm.controls; }

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
        headerName: 'Ligand-Version',
        field: 'ligandVersion',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Ordinal',
        field: 'Ordinal',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Collection-id',
        field: 'Collectionid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Assay-type',
        field: 'AssayType',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Toxicity-type',
        field: 'Toxicity',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },

      {
        headerName: 'Route-of-administration',
        field: 'Route',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose',
        field: 'Ligand',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Unit',
        field: 'Unit',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose',
        field: 'Liganddose',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose',
        field: 'Ligand',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Unit',
        field: 'Units',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Administration-regimen',
        field: 'Administration',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Procedure',
        field: 'Procedure',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Target-uri',
        field: 'Target',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition type',
        field: 'Conditiontype',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material',
        field: 'Conditionmaterial',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material-id',
        field: 'Conditionmaterialid',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'value',
        field: 'value',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'unit',
        field: 'united',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
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
      },
    ]
  }


  onEditButtonClick(params: any) {
    this.assayId = params.data.assayId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.AssayForm.patchValue({
      'assayId': params.data.assayId,
      'ordinal': params.data.ordinal,
      'collectionId': params.data.collectionId,
      'ligandVersionSlno': params.data.ligandVersionSlno,
      'assayTypeSlno': params.data.assayTypeSlno,
      'toxiCitySlno': params.data.toxiCitySlno,
      'routeSlno': params.data.routeSlno,
      'ligandSvalue': params.data.ligandSvalue,
      'unitSlno': params.data.unitSlno,
      'ligandHvalue': params.data.ligandHvalue,
      'ligandLvalue': params.data.ligandLvalue,
      'unitsSlno': params.data.unitsSlno,
      'administration': params.data.administration,
      'procedure': params.data.procedure,
      'target': params.data.target,
      'conditionType': params.data.conditionType,
      'targetStatus': params.data.targetStatus,
      'conditionMaterial': params.data.conditionMaterial,
      'conditionMaterialid': params.data.conditionMaterialid,
      'unitedSlno': params.data.unitedSlno,

    });
  }


  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Assay";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.assayManager.assaydelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.assay.length; i++) {
            if (this.assay[i].assayId == params.data.assayId) {
              this.assay?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Assay Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Assay";
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



  onAssayClick(event: any, itemsForm: any) {
    this.markFormGroupTouched(this.AssayForm);
    this.submitted = true;
    if (this.AssayForm.invalid) {
      return;
    }
    let assay001wb = new Assay001wb();
    assay001wb.assayId = this.f.assayId.value ? this.f.assayId.value : "";
    assay001wb.ordinal = this.f.ordinal.value ? this.f.ordinal.value : "";
    assay001wb.collectionId = this.f.collectionId.value ? this.f.collectionId.value : "";
    assay001wb.ligandVersionSlno = this.f.ligandVersionSlno.value ? this.f.ligandVersionSlno.value : "";
    assay001wb.assayTypeSlno = this.f.assayTypeSlno.value ? this.f.assayTypeSlno.value : "";
    assay001wb.toxiCitySlno = this.f.toxiCitySlno.value ? this.f.toxiCitySlno.value : "";
    assay001wb.routeSlno = this.f.routeSlno.value ? this.f.routeSlno.value : "";
    assay001wb.ligandSvalue = this.f.ligandSvalue.value ? this.f.ligandSvalue.value : "";
    assay001wb.unitSlno = this.f.unitSlno.value ? this.f.unitSlno.value : "";
    assay001wb.ligandHvalue = this.f.ligandHvalue.value ? this.f.ligandHvalue.value : "";
    assay001wb.ligandLvalue = this.f.ligandLvalue.value ? this.f.ligandLvalue.value : "";
    assay001wb.unitsSlno = this.f.unitsSlno.value ? this.f.unitsSlno.value : "";
    assay001wb.administration = this.f.administration.value ? this.f.administration.value : "";
    assay001wb.procedure = this.f.procedure.value ? this.f.procedure.value : "";
    assay001wb.target = this.f.target.value ? this.f.target.value : "";
    assay001wb.conditionType = this.f.conditionType.value ? this.f.conditionType.value : "";
    assay001wb.conditionMaterial = this.f.conditionMaterial.value ? this.f.conditionMaterial.value : "";
    assay001wb.conditionMaterialid = this.f.conditionMaterialid.value ? this.f.conditionMaterialid.value : "";
    assay001wb.value = this.f.value.value ? this.f.value.value : "";
    assay001wb.unitedSlno = this.f.unitedSlno.value ? this.f.unitedSlno.value : "";


    if (this.assayId) {
      assay001wb.assayId = this.assayId;
      assay001wb.insertUser = this.insertUser;
      assay001wb.insertDatetime = this.insertDatetime;
      assay001wb.updatedUser = this.authManager.getcurrentUser.username;
      assay001wb.updatedDatetime = new Date();
      this.assayManager.assayupdate(assay001wb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Details Updated Successfully");
        this.loadData();
        this.AssayForm.reset();
        this.assayId = null;
        this.submitted = false;
      });
    }
    else {
      assay001wb.insertUser = this.authManager.getcurrentUser.username;
      assay001wb.insertDatetime = new Date();
      this.assayManager.assaysave(assay001wb).subscribe((response) => {
        this.calloutService.showSuccess("Assay Details Saved Successfully");
        this.loadData();
        this.AssayForm.reset();
        this.submitted = false;
      });
    }

  }



  onReset() {
    this.submitted = false;
    this.AssayForm.reset();
  }
}
