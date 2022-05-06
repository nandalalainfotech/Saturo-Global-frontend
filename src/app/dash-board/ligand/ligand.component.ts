import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
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

  TanNumber: number | any;
  LigandUri: number | any;
  LigandVersion: number | any;
  ligandStatus: string = "";
  LigandType: string = "";
  collectionName: number | any;
  collection: string = "";
  collectionId: number | any;
  ligandDetail: string = "";
  locator: string = "";
  sourceType: string = "";
  citation: number | any;
  diseaseName: string = "";

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
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {

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

  public getJSON(): Observable<any> {
    return this.http.get("./assets/json/ligand.json");
  }

  ngOnInit(): void {


    this.createDataGrid001();

    this.LigandForm = this.formBuilder.group({

      TanNumber: ['', Validators.required],
      LigandUri: ['', Validators.required],
      LigandVersion: ['', Validators.required],
      ligandStatus: [''],
      LigandType: ['', Validators.required],
      collection: [''],
      collectionName: ['', Validators.required],
      collectionId: ['', Validators.required],
      ligandDetail: ['', Validators.required],
      locator: ['', Validators.required],
      sourceType: ['', Validators.required],
      citation: ['', Validators.required],
      diseaseName: ['', Validators.required],
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
        headerName: 'TAN Number',
        field: 'TanNumber',
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
        field: 'LigandUri',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

      },
      {
        headerName: 'Ligand-Version',
        field: 'LigandVersion',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,
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
        field: 'LigandType',
        width: 200,
        flex: 1,
        sortable: true,
        filter: true,
        resizable: true,
        suppressSizeToFit: true,

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
      }
    ];
  }



  get f() { return this.LigandForm.controls; }


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



  }

  onReset() {
    this.submitted = false;
    this.LigandForm.reset();
  }

 

}
