import { HttpClient } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
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
    ordinal: number | any;
    collectionId: string | any;
    assayTypeSlno: string = "";
    toxiCitySlno: string = "";
    routeSlno: string = "";
    ligandSvalue: number | any;
    LigandHvalue: number | any;
    LigandLvalue: number | any;
    unitsSlno: string = "";
    unitSlno: string = "";
    Administration: string = "";
    Procedure: string = "";
    Target: string | any;
    Conditiontype: string = "";
    Conditionmaterial: string = "";
    Conditionmaterialid: number | any;
    value: number | any;
    unitedSlno: number | any;
    insertUser: string = "";
    insertDatetime: Date | any;
    updatedUser: string = "";
    updatedDatetime: Date | any;

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

    public getJSON(): Observable<any> {
        return this.http.get("./assets/json/assay.json");
    }



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
        ]
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

    
    }



    onReset() {
        this.submitted = false;
        this.AssayForm.reset();
    }
}
