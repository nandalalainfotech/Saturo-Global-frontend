import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from 'src/app/shared/services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from 'src/app/shared/services/restcontroller/bizservice/ligandVersion.service';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from 'src/app/shared/services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from 'src/app/shared/services/restcontroller/entities/Ligandversion001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';
import { Utils } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-ligand',
  templateUrl: './ligand.component.html',
  styleUrls: ['./ligand.component.css']
})
export class LigandComponent implements OnInit {

  public LigandForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  ligandId: number | any;
  tanNumber: number | any;
  ligandUri: number | any;
  ligandVersionSlno: number | any;
  ligandStatus: string = "";
  ligandTypeSlno: string = "";
  collectionName: number | any;
  collection: string = "";
  collectionId: number | any;
  ligandDetail: string = "";
  locator: string = "";
  sourceType: string = "";
  citation: number | any;
  diseaseName: string = "";

  target: number | any;
  targetVersion: number | any;
  targetStatus: string = "";
  collectionId1: number | any;
  original: number | any;
  acronym: number | any;
  organism: number | any;
  variant: number | any;
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;
  ligand: Ligand001wb[] = [];
  ligandVersions: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb [] = [];

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
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private ligandVersionManager: LigandVersionManager,
    private ligandTypeManager: LigandTypeManager,
  ) {

    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {


    this.ligandVersionManager.allligandVersion().subscribe(response => {
      this.ligandVersions = deserialize<Ligandversion001mb[]>(Ligandversion001mb, response);

    });

    this.ligandTypeManager.allligandType().subscribe(response => {
      this.ligandtypes = deserialize<Ligandtype001mb[]>(Ligandtype001mb, response);
      
    });

    this.createDataGrid001();

    this.LigandForm = this.formBuilder.group({

      tanNumber: ['', Validators.required],
      ligandUri: ['', Validators.required],
      ligandVersionSlno: ['', Validators.required],
      ligandVersions:[''],
      ligandStatus: [''],
      ligandTypeSlno: ['', Validators.required],
      collection: [''],
      collectionName: ['', Validators.required],
      collectionId: ['', Validators.required],
      ligandDetail: ['', Validators.required],
      locator: ['', Validators.required],
      sourceType: ['',],
      citation: ['', Validators.required],
      diseaseName: ['', Validators.required],
      target: ['', Validators.required],
      targetVersion: ['', Validators.required],
      targetStatus: ['',],
      collectionId1: ['', Validators.required],
      original: ['', Validators.required],
      acronym: ['', Validators.required],
      organism: ['', Validators.required],
      variant: ['', Validators.required],
    });


    this.loadData();

    this.authManager.currentUserSubject.subscribe((object: any) => {
      let rgb = Utils.hexToRgb(object.theme);
      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });


  }

  loadData() {
    this.ligandManager.allligand().subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
      if (this.ligand.length > 0) {
        this.gridOptions?.api?.setRowData(this.ligand);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.LigandForm.controls; }

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
        field: 'ligandId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'TAN Number',
        field: 'tanNumber',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-Uri',
        field: 'ligandUri',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Ligand-Version',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVersion.bind(this)
      },
      {
        headerName: 'Ligand-status',
        field: 'ligandStatus',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Collection',
        field: 'collection',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-Type',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setType.bind(this)

      },
      {
        headerName: 'Collection-name',
        field: 'collectionName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Collection-id',
        field: 'collectionId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand-detail',
        field: 'ligandDetail',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Locator',
        field: 'locator',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Source-type',
        field: 'sourceType',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Citation',
        field: 'citation',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Original-disease-name',
        field: 'diseaseName',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Ligand Version',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setVersion.bind(this)
      },
      {
        headerName: 'Target-Uri',
        field: 'target',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Target-Version',
        field: 'targetVersion',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Target-Status',
        field: 'targetStatus',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Collection-ID',
        field: 'collectionId1',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Target-Name',
        field: 'original',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Acronym',
        field: 'acronym',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Organism-Source',
        field: 'organism',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
      },
      {
        headerName: 'Variant',
        field: 'variant',
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
      },
    ];
  }

  setVersion(params: any): string {
    return params.data.ligandVersionSlno2 ? params.data.ligandVersionSlno2.ligandVersion : null;
  }

  setType(params: any): string {
    return params.data.ligandTypeSlno2 ? params.data.ligandTypeSlno2.ligandtype : null;
  }


  onEditButtonClick(params: any) {
    this.ligandId = params.data.ligandId;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.LigandForm.patchValue({

      'tanNumber': params.data.tanNumber,
      'ligandUri': params.data.ligandUri,
      'ligandVersionSlno': params.data.ligandVersionSlno,
      'ligandStatus': params.data.ligandStatus,
      'collection': params.data.collection,
      'ligandTypeSlno': params.data.ligandTypeSlno,
      'ligandDetail': params.data.ligandDetail,
      'collectionName': params.data.collectionName,
      'collectionId': params.data.collectionId,
      'locator': params.data.locator,
      'sourceType': params.data.sourceType,
      'citation': params.data.citation,
      'diseaseName': params.data.diseaseName,
      'target': params.data.target,
      'targetVersion': params.data.targetVersion,
      'targetStatus': params.data.targetStatus,
      'collectionId1': params.data.collectionId1,
      'original': params.data.original,
      'acronym': params.data.acronym,
      'organism': params.data.organism,
      'variant': params.data.variant,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "Ligand";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.ligandManager.liganddelete(params.data.slNo).subscribe((response) => {
          for (let i = 0; i < this.ligand.length; i++) {
            if (this.ligand[i].ligandId == params.data.ligandId) {
              this.ligand?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("Ligand Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "Ligand";
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

  onLigandClick(event: any, LigandForm: any) {
    this.markFormGroupTouched(this.LigandForm);
    this.submitted = true;
    if (this.LigandForm.invalid) {
      return;
    }
    let ligand001wb = new Ligand001wb();
    ligand001wb.tanNumber = this.f.tanNumber.value ? this.f.tanNumber.value : "";
    ligand001wb.ligandUri = this.f.ligandUri.value ? this.f.ligandUri.value : "";
    ligand001wb.ligandVersionSlno = this.f.ligandVersionSlno.value ? this.f.ligandVersionSlno.value : "";
    ligand001wb.ligandStatus = this.f.ligandStatus.value ? this.f.ligandStatus.value : "";
    ligand001wb.collection = this.f.collection.value ? this.f.collection.value : "";
    ligand001wb.ligandTypeSlno = this.f.ligandTypeSlno.value ? this.f.ligandTypeSlno.value : "";
    ligand001wb.ligandDetail = this.f.ligandDetail.value ? this.f.ligandDetail.value : "";
    ligand001wb.collectionName = this.f.collectionName.value ? this.f.collectionName.value : "";
    ligand001wb.collectionId = this.f.locator.value ? this.f.collectionId.value : "";
    ligand001wb.locator = this.f.ligandStatus.value ? this.f.locator.value : "";
    ligand001wb.sourceType = this.f.sourceType.value ? this.f.sourceType.value : "";
    ligand001wb.citation = this.f.citation.value ? this.f.citation.value : "";
    ligand001wb.diseaseName = this.f.diseaseName.value ? this.f.diseaseName.value : "";
    ligand001wb.target = this.f.target.value ? this.f.target.value : "";
    ligand001wb.targetStatus = this.f.targetStatus.value ? this.f.targetStatus.value : "";
    ligand001wb.targetVersion = this.f.targetVersion.value ? this.f.targetVersion.value : "";
    ligand001wb.collectionId1 = this.f.collectionId1.value ? this.f.collectionId1.value : "";
    ligand001wb.original = this.f.original.value ? this.f.original.value : "";
    ligand001wb.acronym = this.f.acronym.value ? this.f.acronym.value : "";
    ligand001wb.organism = this.f.organism.value ? this.f.organism.value : "";
    ligand001wb.variant = this.f.variant.value ? this.f.variant.value : "";

    if (this.ligandId) {
      ligand001wb.ligandId = this.ligandId;
      ligand001wb.insertUser = this.insertUser;
      ligand001wb.insertDatetime = this.insertDatetime;
      ligand001wb.updatedUser = this.authManager.getcurrentUser.username;
      ligand001wb.updatedDatetime = new Date();
      this.ligandManager.ligandupdate(ligand001wb).subscribe((response) => {
        this.calloutService.showSuccess("Ligand Details Updated Successfully");
        this.loadData();
        this.LigandForm.reset();
        this.ligandId = null;
        this.submitted = false;
      });
    }
    else {
      ligand001wb.insertUser = this.authManager.getcurrentUser.username;
      ligand001wb.insertDatetime = new Date();
      this.ligandManager.ligandsave(ligand001wb).subscribe((response) => {
        this.calloutService.showSuccess("Breakdown Details Saved Successfully");
        this.loadData();
        this.LigandForm.reset();
        this.submitted = false;
      });
    }


  }


  onLigandVersionClick() {
    this.LigandForm.get('ligandVersionSlno').valueChanges.subscribe((value: any) => {
      for (let ligandVer of this.ligandVersions) {
        if (ligandVer.id == value) {
          this.LigandForm.patchValue({
            'ligandVersions': ligandVer.ligandVersion,

          });
          break;
        }
      }
    });
  }

  onReset() {
    this.submitted = false;
    this.LigandForm.reset();
  }



}
