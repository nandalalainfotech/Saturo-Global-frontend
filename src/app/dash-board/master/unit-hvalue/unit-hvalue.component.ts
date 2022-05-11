import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { AuditComponent } from 'src/app/shared/audit/audit.component';
import { ConformationComponent } from 'src/app/shared/conformation/conformation.component';
import { IconRendererComponent } from 'src/app/shared/services/renderercomponent/icon-renderer-component';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UnitHighEndValueManager } from 'src/app/shared/services/restcontroller/bizservice/UnitHighEndValue.service';
import { Unithighendvalue001mb } from 'src/app/shared/services/restcontroller/entities/Unithighendvalue001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
  selector: 'app-unit-hvalue',
  templateUrl: './unit-hvalue.component.html',
  styleUrls: ['./unit-hvalue.component.css']
})
export class UnitHvalueComponent implements OnInit {

  public UnitHigendForm: FormGroup | any;
  frameworkComponents: any;
  submitted = false;
  id: number | any;
  units: string = "";
  insertUser: string = "";
  insertDatetime: Date | any;
  updatedUser: string = "";
  updatedDatetime: Date | any;

  unithighendvalue001: Unithighendvalue001mb[] = [];

  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;

  constructor(
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private router: Router,
    private modalService: NgbModal,
    private unitHighEndValueManager: UnitHighEndValueManager,
  ) { 
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
  }

  ngOnInit(): void {

    this.createDataGrid001()

    this.UnitHigendForm = this.formBuilder.group({
      units: ['', Validators.required],
    });

    this.loadData();

  }

  loadData() {
    this.unitHighEndValueManager.allunitHighEndValue().subscribe(response => {
      this.unithighendvalue001 = deserialize<Unithighendvalue001mb[]>(Unithighendvalue001mb, response);
      if (this.unithighendvalue001.length > 0) {
        this.gridOptions?.api?.setRowData(this.unithighendvalue001);
      } else {
        this.gridOptions?.api?.setRowData([]);
      }
    });
  }


  get f() { return this.UnitHigendForm.controls; }

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
        headerName: 'SL-No',
        field: 'id',
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
        headerName: 'Unit(highValue)',
        field: 'units',
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

  onEditButtonClick(params: any) {
    this.id = params.data.id;
    this.insertUser = params.data.insertUser;
    this.insertDatetime = params.data.insertDatetime;
    this.UnitHigendForm.patchValue({
      'units': params.data.units,
    });
  }

  onDeleteButtonClick(params: any) {
    const modalRef = this.modalService.open(ConformationComponent);
    modalRef.componentInstance.details = "UnitHighValue";
    modalRef.result.then((data) => {
      if (data == "Yes") {
        this.unitHighEndValueManager.unitHighEndValuedelete(params.data.id).subscribe((response) => {
          for (let i = 0; i < this.unithighendvalue001.length; i++) {
            if (this.unithighendvalue001[i].id == params.data.id) {
              this.unithighendvalue001?.splice(i, 1);
              break;
            }
          }
          const selectedRows = params.api.getSelectedRows();
          params.api.applyTransaction({ remove: selectedRows });
          this.gridOptions.api.deselectAll();
          this.calloutService.showSuccess("UnitHighValue Removed Successfully");
        });
      }
    })
  }

  onAuditButtonClick(params: any) {
    const modalRef = this.modalService.open(AuditComponent);
    modalRef.componentInstance.title = "UnitHighValue";
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

  onUnitUnitHigendvalueClick(event: any, UnitHigendForm: any) {
    this.markFormGroupTouched(this.UnitHigendForm);
    this.submitted = true;
    if (this.UnitHigendForm.invalid) {
      return;
    }

    let unithighendvalue001mb = new Unithighendvalue001mb();

    unithighendvalue001mb.units = this.f.units.value ? this.f.units.value : "";
    if (this.id) {
      unithighendvalue001mb.id = this.id;
      unithighendvalue001mb.insertUser = this.insertUser;
      unithighendvalue001mb.insertDatetime = this.insertDatetime;
      unithighendvalue001mb.updatedUser = this.authManager.getcurrentUser.username;
      unithighendvalue001mb.updatedDatetime = new Date();
      this.unitHighEndValueManager.unitHighEndValueupdate(unithighendvalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("UnitHighValue Details Updated Successfully");
        this.UnitHigendForm.reset();
        this.id = null;
        this.loadData();
        this.submitted = false;
      });
    }
    else {
      unithighendvalue001mb.insertUser = this.authManager.getcurrentUser.username;
      unithighendvalue001mb.insertDatetime = new Date();
      this.unitHighEndValueManager.unitHighEndValuesave(unithighendvalue001mb).subscribe((response) => {
        this.calloutService.showSuccess("UnitHighValue Details Saved Successfully");
        this.UnitHigendForm.reset();
        this.loadData();
        this.submitted = false;
      });
    }

  }

  onReset() {
    this.submitted = false;
    this.UnitHigendForm.reset();
  }

}
