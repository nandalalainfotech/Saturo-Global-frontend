import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { deserialize } from 'serializer.ts/Serializer';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AssayManager } from 'src/app/shared/services/restcontroller/bizservice/Assay.service';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from 'src/app/shared/services/restcontroller/bizservice/ligandManager.service';
import { MeasurementManager } from 'src/app/shared/services/restcontroller/bizservice/Measurement.service';
import { Assay001wb } from 'src/app/shared/services/restcontroller/entities/Assay001wb ';
import { Ligand001wb } from 'src/app/shared/services/restcontroller/entities/Ligand001wb';
import { Measurement001wb } from 'src/app/shared/services/restcontroller/entities/Measurement001wb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  frameworkComponents: any;
  public gridOptions: GridOptions | any;
  public gridOptions1: GridOptions | any;
  public gridOptions2: GridOptions | any;
  ligand: Ligand001wb[] = [];
  assay: Assay001wb[] = [];
  measurement: Measurement001wb[] = [];

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private ligandManager: LigandManager,
    private assayManager: AssayManager,
    private measurementManager: MeasurementManager,
    private http: HttpClient,
  ) {
    
      this.frameworkComponents = {
        iconRenderer: IconRendererComponent
      }
   }

  ngOnInit(): void {

    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();

    

    this.ligandManager.allligand().subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
      if (this.ligand.length > 0) {
        this.gridOptions?.api?.setRowData(this.ligand);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });

     this.assayManager.allassay().subscribe(response => {
      this.assay = deserialize<Assay001wb[]>(Assay001wb, response);
      if (this.assay.length > 0) {
        this.gridOptions1?.api?.setRowData(this.assay);
      } else {
        this.gridOptions1?.api?.setRowData([]);
      }
    });


    this.measurementManager.allmeasurement().subscribe(response => {
      this.measurement = deserialize<Measurement001wb[]>(Measurement001wb, response);
      if (this.measurement.length > 0) {
        this.gridOptions2?.api?.setRowData(this.measurement);
      } else {
        this.gridOptions2?.api?.setRowData([]);
      }
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
        valueGetter: this.setLigandVersion.bind(this)
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
        valueGetter: this.setLigandVersion.bind(this)
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
     
    ];
  }

  setLigandVersion(params: any): string {
    return params.data.ligandVersionSlno2 ? params.data.ligandVersionSlno2.ligandVersion : null;
  }

  setType(params: any): string {
    return params.data.ligandTypeSlno2 ? params.data.ligandTypeSlno2.ligandtype : null;
  }


  // ----------------------------------assay------------------------------------

  createDataGrid002(): void {
    this.gridOptions1 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions1.editType = 'fullRow';
    this.gridOptions1.enableRangeSelection = true;
    this.gridOptions1.animateRows = true;

    this.gridOptions1.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'assayId',
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
        headerName: 'Ordinal',
        field: 'ordinal',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Collection-id',
        field: 'collectionId',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Assay-type',
        field: 'assayTypeSlno',
        width: 200,
        flex: 1,
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
        flex: 1,
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
        flex: 1,
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
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit(singleValue)',
        field: 'unitSlno',
        width: 200,
        flex: 1,
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
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Ligand-Dose(lowValue)',
        field: 'ligandLvalue',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true
      },
      {
        headerName: 'Unit(highValue)',
        field: 'unitsSlno',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setUnitHighValue.bind(this)
      },
      {
        headerName: 'unit(lowValue)',
        field: 'unitedSlno',
        width: 200,
        flex: 1,
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
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Procedure',
        field: 'procedure',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Target-uri',
        field: 'target',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition type',
        field: 'conditionType',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material',
        field: 'conditionMaterial',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,

        suppressSizeToFit: true
      },
      {
        headerName: 'Condition material-id',
        field: 'conditionMaterialid',
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

  setUnitHighValue(params: any): string {
    return params.data.unitsSlno2 ? params.data.unitsSlno2.units : null;
  }

  setUnitLowValue(params: any): string {
    return params.data.unitedSlno2 ? params.data.unitedSlno2.united : null;
  }



  // -------------------------measurement---------------------------------



  createDataGrid003(): void {
    this.gridOptions2 = {
      paginationPageSize: 10,
      rowSelection: 'single',
      // onFirstDataRendered: this.onFirstDataRendered.bind(this),
    };
    this.gridOptions2.editType = 'fullRow';
    this.gridOptions2.enableRangeSelection = true;
    this.gridOptions2.animateRows = true;
    this.gridOptions2.columnDefs = [
      {
        headerName: 'Sl-No',
        field: 'measurementId',
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
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCategory.bind(this)
      },
      {
        headerName: 'Function',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setCategoryFunction.bind(this)
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
        headerName: 'Original-prefix',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setOriginalPrefix.bind(this)
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
        headerName: 'Original-value(High-End-value)',
        field: 'highEndValue',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Original-value(Low-End-value)',
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
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
        valueGetter: this.setTypes.bind(this)
        
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

  setCategory(params: any): string {
    return params.data.categorySlno2 ? params.data.categorySlno2.category : null;
  }

  setCategoryFunction(params: any): string {
    return params.data.functionSlno2 ? params.data.functionSlno2.function : null;
  }
 
  setOriginalPrefix(params: any): string {
    return params.data.originalPrefixSlno2 ? params.data.originalPrefixSlno2.originalPrefix : null;
  }


  setTypes(params: any): string {
    return params.data.typeSlno2 ? params.data.typeSlno2.type : null;
  }

}
