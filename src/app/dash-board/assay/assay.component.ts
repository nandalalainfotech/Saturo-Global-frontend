import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ControllersService, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AssayTypeManager } from 'src/app/shared/services/restcontroller/bizservice/assayType.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { RouteofAdminManager } from 'src/app/shared/services/restcontroller/bizservice/routeOfAdministration.service';
import { ToxicityManager } from 'src/app/shared/services/restcontroller/bizservice/toxiCity.service';
import { UnitlowendvalueManager } from 'src/app/shared/services/restcontroller/bizservice/Unitlowendvalue.service';
import { UnitSingleValueManager } from 'src/app/shared/services/restcontroller/bizservice/unitSingleValue.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Assaytype001mb } from 'src/app/shared/services/restcontroller/entities/Assaytype001mb';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { Routeofadministration001mb } from 'src/app/shared/services/restcontroller/entities/Routeofadministration001mb';
import { Toxicity001mb } from 'src/app/shared/services/restcontroller/entities/Toxicity001mb';
import { Unitlowendvalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitlowendvalue001mb';
import { Unitsinglevalue001mb } from 'src/app/shared/services/restcontroller/entities/Unitsinglevalue001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';
import { v4 as uuid } from 'uuid';

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
  ligandSlno: number | any;
  ordinal: string = "";
  // collectionId: string = "";
  assayTypeSlno: number | any;
  toxiCitySlno: number | any;
  routeSlno: number | any;
  ligandSvalue: string = "";
  unitSlno: number | any;
  ligandHvalue: string = "";
  ligandLvalue: string = "";
  unitedSlno: number | any;
  administration: string = "";
  procedure: string = "";
  target: string = "";
  conditionType: string = "";
  conditionMaterial: string = "";
  conditionMaterialid: string = "";
  singleCondition: string = "";
  singleUnit: string = "";
  highCondition: string = "";
  lowCondition: string = "";
  highLowUnit: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  assay: Assay001wb[] = [];
  ligands: Ligand001wb[] = [];
  assayTypes: Assaytype001mb[] = [];
  toxiCities: Toxicity001mb[] = [];
  routeAdmins: Routeofadministration001mb[] = [];
  unitsinglevalues: Unitsinglevalue001mb[] = [];
  unitlowendvalues: Unitlowendvalue001mb[] = [];
  ligandVersions: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb[] = [];
  ligand001mb?: Ligand001wb;
  hexToRgb: any;
  rgbToHex: any;
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;
  username: any;

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
    private assayManager: AssayManager,
    private ligandManager: LigandManager,
    private assayTypeManager: AssayTypeManager,
    private toxicityManager: ToxicityManager,
    private routeofAdminManager: RouteofAdminManager,
    private unitSingleValueManager: UnitSingleValueManager,
    private unitlowendvalueManager: UnitlowendvalueManager,
    private ligandVersionManager: LigandVersionManager) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }

  }

  ngOnInit(): void {

    this.createDataGrid001();
    this.username = this.authManager.getcurrentUser.username;

    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligands = deserialize<Ligand001wb[]>(Ligand001wb, response);
      // console.log("this.ligands--->",this.ligands);
    });

    this.assayTypeManager.allassayType().subscribe(response => {
      this.assayTypes = deserialize<Assaytype001mb[]>(Assaytype001mb, response);
    });

    this.toxicityManager.alltoxicityType().subscribe(response => {
      this.toxiCities = deserialize<Toxicity001mb[]>(Toxicity001mb, response);
    });

    this.routeofAdminManager.allrouteofadminType().subscribe(response => {
      this.routeAdmins = deserialize<Routeofadministration001mb[]>(Routeofadministration001mb, response);
    });

    this.unitSingleValueManager.allunitSingleValue().subscribe(response => {
      this.unitsinglevalues = deserialize<Unitsinglevalue001mb[]>(Unitsinglevalue001mb, response);
    });

    this.unitlowendvalueManager.allunitlowendvalue().subscribe(response => {
      this.unitlowendvalues = deserialize<Unitlowendvalue001mb[]>(Unitlowendvalue001mb, response);
    });

    this.AssayForm = this.formBuilder.group({
      ligandSlno: [''],
      ordinal: [''],
      assayTypeSlno: [''],
      toxiCitySlno: [''],
      routeSlno: [''],
      ligandSvalue: [''],
      unitSlno: [''],
      ligandHvalue: [''],
      ligandLvalue: [''],
      unitedSlno: [''],
      administration: [''],
      procedure: [''],
      conditionType: [''],
      conditionMaterial: [''],
      singleCondition: [''],
      singleUnit: [''],
      highCondition: [''],
      lowCondition: [''],
      highLowUnit: [''],
      conditionMaterialid: [''],

    });

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });



    this.loadData();


  }
  // this.username = this.authManager.getcurrentUser.username;
  loadData() {
    this.assayManager.allassay(this.username).subscribe(response => {
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
        headerName: 'Sl-No',
        field: 'assayId',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-Version',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVersion.bind(this)
      },
      {
        headerName: 'Ordinal',
        field: 'ordinal',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

      {
        headerName: 'Assay-type',
        field: 'assayTypeSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setAssayType.bind(this)
      },
      {
        headerName: 'Toxicity-type',
        field: 'toxiCitySlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setToxicityType.bind(this)
      },

      {
        headerName: 'Route-of-administration',
        field: 'routeSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setRouteAdmin.bind(this)
      },
      {
        headerName: 'Ligand-Dose(singleValue)',
        field: 'ligandSvalue',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit(singleValue)',
        field: 'unitSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setUnitSingleValue.bind(this)
      },
      {
        headerName: 'Ligand-Dose(highValue)',
        field: 'ligandHvalue',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose(lowValue)',
        field: 'ligandLvalue',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

      {
        headerName: 'unit',
        field: 'unitedSlno',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setUnitLowValue.bind(this)
      },
      {
        headerName: 'Administration',
        field: 'administration',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Procedure',
        field: 'procedure',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition type',
        field: 'conditionType',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material',
        field: 'conditionMaterial',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material-id',
        field: 'conditionMaterialid',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(Single-value)',
        field: 'singleCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit(Single-value)',
        field: 'singleUnit',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(High-end-value)',
        field: 'highCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Condition(Low-end-value)',
        field: 'lowCondition',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit',
        field: 'highLowUnit',
        width: 200,
        // flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },

      {
        headerName: 'Edit',
        cellRenderer: 'iconRenderer',
        width: 80,
        // flex: 1,
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
        // flex: 1,
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
        // flex: 1,
        suppressSizeToFit: true,
        cellStyle: { textAlign: 'center' },
        cellRendererParams: {
          onClick: this.onAuditButtonClick.bind(this),
          label: 'Audit'
        },
      },
    ]
  }

  setVersion(params: any): string {
    return params.data.ligandSlno2 ? params.data.ligandSlno2.ligandVersionSlno2?.ligandVersion : null;
  }

  setAssayType(params: any): string {
    return params.data.assayTypeSlno2 ? params.data.assayTypeSlno2.assayType : null;
  }

  setToxicityType(params: any): string {
    return params.data.toxiCitySlno2 ? params.data.toxiCitySlno2.toxiCity : null;
  }

  setRouteAdmin(params: any): string {
    return params.data.routeSlno2 ? params.data.routeSlno2.route : null;
  }

  setUnitSingleValue(params: any): string {
    return params.data.unitSlno2 ? params.data.unitSlno2.unit : null;
  }

  // setUnitHighValue(params: any): string {
  //   return params.data.unitsSlno2 ? params.data.unitsSlno2.units : null;
  // }

  setUnitLowValue(params: any): string {
    return params.data.unitedSlno2 ? params.data.unitedSlno2.united : null;
  }


  onEditButtonClick(params: any) {
    this.assayId = params.data.assayId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.AssayForm.patchValue({
      'ordinal': params.data.ordinal,
      'ligandSlno': params.data.ligandSlno,
      'assayTypeSlno': params.data.assayTypeSlno,
      'toxiCitySlno': params.data.toxiCitySlno,
      'routeSlno': params.data.routeSlno,
      'ligandSvalue': params.data.ligandSvalue,
      'unitSlno': params.data.unitSlno,
      'ligandHvalue': params.data.ligandHvalue,
      'ligandLvalue': params.data.ligandLvalue,
      'unitedSlno': params.data.unitedSlno,
      'administration': params.data.administration,
      'procedure': params.data.procedure,
      'conditionType': params.data.conditionType,
      'conditionMaterial': params.data.conditionMaterial,
      'conditionMaterialid': params.data.conditionMaterialid,
      'singleCondition': params.data.singleCondition,
      'singleUnit': params.data.singleUnit,
      'highCondition': params.data.highCondition,
      'lowCondition': params.data.lowCondition,
      'highLowUnit': params.data.highLowUnit,
});
  }


  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Assay";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.assayManager.assaydelete(params.data.assayId).subscribe((response) => {
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

  onAssayClick(event: any, AssayForm: any) {
    this.markFormGroupTouched(this.AssayForm);
    this.submitted = true;
    if (this.AssayForm.invalid) {
      return;
    }
    let assay001wb = new Assay001wb();
    assay001wb.ordinal = this.f.ordinal.value ? this.f.ordinal.value : "";
    assay001wb.collectionId = "47498009Q-1";
    assay001wb.ligandSlno = this.f.ligandSlno.value ? this.f.ligandSlno.value : "";
    assay001wb.assayTypeSlno = this.f.assayTypeSlno.value ? this.f.assayTypeSlno.value : "";
    assay001wb.toxiCitySlno = this.f.toxiCitySlno.value ? this.f.toxiCitySlno.value : "";
    assay001wb.routeSlno = this.f.routeSlno.value ? this.f.routeSlno.value : "";
    assay001wb.ligandSvalue = this.f.ligandSvalue.value ? this.f.ligandSvalue.value : "";
    assay001wb.unitSlno = this.f.unitSlno.value ? this.f.unitSlno.value : "";
    assay001wb.ligandHvalue = this.f.ligandHvalue.value ? this.f.ligandHvalue.value : "";
    assay001wb.ligandLvalue = this.f.ligandLvalue.value ? this.f.ligandLvalue.value : "";
    assay001wb.unitedSlno = this.f.unitedSlno.value ? this.f.unitedSlno.value : "";
    assay001wb.administration = this.f.administration.value ? this.f.administration.value : "";
    assay001wb.procedure = this.f.procedure.value ? this.f.procedure.value : "";
    assay001wb.target = "bioactivity-target" + "/" + "SaturoGlobal" + "/" + this.ligand001mb?.tanNumber + "/" + this.f.ordinal.value + ">" + "bioactivity-target" + "/" + uuid();
    assay001wb.conditionType = this.f.conditionType.value ? this.f.conditionType.value : "";
    assay001wb.conditionMaterial = this.f.conditionMaterial.value ? this.f.conditionMaterial.value : "";
    assay001wb.conditionMaterialid = this.f.conditionMaterialid.value ? this.f.conditionMaterialid.value : "";
    assay001wb.singleCondition = this.f.singleCondition.value ? this.f.singleCondition.value : "";
    assay001wb.singleUnit = this.f.singleUnit.value ? this.f.singleUnit.value : "";
    assay001wb.highCondition = this.f.highCondition.value ? this.f.highCondition.value : "";
    assay001wb.lowCondition = this.f.lowCondition.value ? this.f.lowCondition.value : "";
    assay001wb.highLowUnit = this.f.highLowUnit.value ? this.f.highLowUnit.value : "";

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

  onBlurEvent(event: any) {
    this.ligandManager.findOne(event.target.value).subscribe(response => {
      this.ligand001mb = deserialize<Ligand001wb>(Ligand001wb, response);
  });
  }


  onRepeat() {
    let i = this.assay.length - 1;
    for (i; i < this.assay.length; i++) {
      this.AssayForm.patchValue({
        'ordinal': this.assay[i].ordinal,
        'ligandSlno': this.assay[i].ligandSlno,
        'assayTypeSlno': this.assay[i].assayTypeSlno,
        'toxiCitySlno': this.assay[i].toxiCitySlno,
        'routeSlno': this.assay[i].routeSlno,
        'ligandSvalue': this.assay[i].ligandSvalue,
        'unitSlno': this.assay[i].unitSlno,
        'ligandHvalue': this.assay[i].ligandHvalue,
        'ligandLvalue': this.assay[i].ligandLvalue,
        'unitedSlno': this.assay[i].unitedSlno,
        'administration': this.assay[i].administration,
        'procedure': this.assay[i].procedure,
        'conditionType': this.assay[i].conditionType,
        'conditionMaterial': this.assay[i].conditionMaterial,
        'conditionMaterialid': this.assay[i].conditionMaterialid,
        'singleCondition': this.assay[i].singleCondition,
        'singleUnit': this.assay[i].singleUnit,
        'highCondition': this.assay[i].highCondition,
        'lowCondition':this.assay[i].lowCondition,
        'highLowUnit': this.assay[i].highLowUnit
  });
    }
  }

  onEdit() {
    let i = this.assay.length - 1;
    for (i; i < this.assay.length; i++) {
      
      this.assayId =this.assay[i].assayId;
      this.insertDatetime = new Date();
    // this.insertUser = this.assay[i].insertUser;

    this.AssayForm.patchValue({
      'ordinal': this.assay[i].ordinal,
      'ligandSlno': this.assay[i].ligandSlno,
      'assayTypeSlno': this.assay[i].assayTypeSlno,
      'toxiCitySlno': this.assay[i].toxiCitySlno,
      'routeSlno': this.assay[i].routeSlno,
      'ligandSvalue': this.assay[i].ligandSvalue,
      'unitSlno': this.assay[i].unitSlno,
      'ligandHvalue': this.assay[i].ligandHvalue,
      'ligandLvalue': this.assay[i].ligandLvalue,
      'unitedSlno': this.assay[i].unitedSlno,
      'administration': this.assay[i].administration,
      'procedure': this.assay[i].procedure,
      'conditionType': this.assay[i].conditionType,
      'conditionMaterial': this.assay[i].conditionMaterial,
      'conditionMaterialid': this.assay[i].conditionMaterialid,
      'singleCondition': this.assay[i].singleCondition,
      'singleUnit': this.assay[i].singleUnit,
      'highCondition': this.assay[i].highCondition,
      'lowCondition':this.assay[i].lowCondition,
      'highLowUnit': this.assay[i].highLowUnit
});
}
}
}