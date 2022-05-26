import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { deserialize } from 'serializer.ts/Serializer';
import { LigandComponent } from 'src/app/dash-board/ligand/ligand.component';
import { IconRendererComponent } from '../services/renderercomponent/icon-renderer-component';
import { AuthManager } from '../services/restcontroller/bizservice/auth-manager.service';
import { LigandManager } from '../services/restcontroller/bizservice/ligandManager.service';
import { LigandTypeManager } from '../services/restcontroller/bizservice/ligandType.service';
import { LigandVersionManager } from '../services/restcontroller/bizservice/ligandVersion.service';
import { Ligand001wb } from '../services/restcontroller/entities/Ligand001wb';
import { Ligandtype001mb } from '../services/restcontroller/entities/Ligandtype001mb';
import { Ligandversion001mb } from '../services/restcontroller/entities/Ligandversion001mb';
import { CalloutService } from '../services/services/callout.service';
import { DataSharedService } from '../services/services/datashared.service';
import { Utils } from '../utils/utils';

@Component({
  selector: 'app-checked',
  templateUrl: './checked.component.html',
  styleUrls: ['./checked.component.css']
})
export class CheckedComponent implements OnInit {
  public CheckedForm: FormGroup | any;
  public LigandForm : FormGroup | any;
  frameworkComponents: any;
  submitted = false;

  @Input() data: number | any;

  ligandId: number | any;
  tanNumber: number | any;
  ligandUri: number | any;
  ligandVersionSlno: number | any;
  ligandStatus: string = "";
  ligandTypeSlno: string = "";
  identifier1: string = "";
  identifier2: string = "";
  identifier3: string = "";
  collection: string = "";
  collectionId: number | any;
  ligandDetail: string = "";
  locator: string = "";
  sourceType: string = "";
  citation: string = "";
  relatedDocument:string = "";
  registryNumber: string = "";
  diseaseName1: string = "";
  diseaseName2: string = "";
  diseaseName3: string = "";
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

  username:any;

  ligand: Ligand001wb[] = [];
  ligandVersions: Ligandversion001mb[] = [];
  ligandtypes: Ligandtype001mb[] = [];

  @Output() open: EventEmitter<boolean> = new EventEmitter();
  SearchMenuValues: string = '';
  SearchMenuItems: string = '';
  isActive: boolean | undefined;
  activeTab: boolean = false;
  searchStr: any;
  modalRef: any;
  parentMenuString: string = "";
  childMenuString: string = "";

  

  hexToRgb: any;
  rgbToHex: any;
  public gridOptions: GridOptions | any;
  rowData: Observable<any[]> | any;
  
  @HostBinding('style.--color_l1') colorthemes_1: any;
  @HostBinding('style.--color_l2') colorthemes_2: any;
  @HostBinding('style.--color_l3') colorthemes_3: any;
  @HostBinding('style.--color_l4') colorthemes_4: any;
  title: string | undefined;
  params: any
  static CheckedForm: any;


  constructor(private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private authManager: AuthManager,
    private formBuilder: FormBuilder,
    private calloutService: CalloutService,
    private dataSharedService: DataSharedService,
    private ligandManager: LigandManager,
    private ligandVersionManager: LigandVersionManager,
    private ligandTypeManager: LigandTypeManager,
  ) {
    this.frameworkComponents = {
      iconRenderer: IconRendererComponent
    }
   }

  ngOnInit(): void { 
    
    // const modalRef = this.modalService.open(LigandComponent,{size:'lg'});
    // this.colorthemes = this.user.theme;
    this.dataSharedService.currentMenuObject.subscribe((object: any) => {
      this.parentMenuString = object.parentMenuString;
      this.childMenuString = object.childMenuString;
    });

    this.username = this.authManager.getcurrentUser.username;
    this.ligandManager.allligand(this.username).subscribe(response => {
      this.ligand = deserialize<Ligand001wb[]>(Ligand001wb, response);
      

    });
    
    this.ligandVersionManager.allligandVersion().subscribe(response => {
      this.ligandVersions = deserialize<Ligandversion001mb[]>(Ligandversion001mb, response);

    });

    this.ligandTypeManager.allligandType().subscribe(response => {
      this.ligandtypes = deserialize<Ligandtype001mb[]>(Ligandtype001mb, response);

    });

   
    this.authManager.currentUserSubject.subscribe((object: any) => {

      let rgb = Utils.hexToRgb(object.theme);

      this.colorthemes_1 = Utils.rgbToHex(rgb, -0.3);

      this.colorthemes_2 = Utils.rgbToHex(rgb, 0.1);

      this.colorthemes_3 = Utils.rgbToHex(rgb, 0.5);

      this.colorthemes_4 = Utils.rgbToHex(rgb, 0.8);
    });
    this.title = this.title + 'SearchMenu';

// console.log("data",this.data);

  this.CheckedForm = this.formBuilder.group({

      tanNumber: [this.data.tanNumber],
      ligandUri: [this.data.ligandUri],
      ligandVersionSlno: [this.data.ligandVersionSlno2.ligandVersion],
      ligandTypeSlno: [this.data.ligandTypeSlno2.ligandtype],
      ligandDetail: [this.data.ligandDetail],
      identifier1: [this.data.identifier1],
      identifier2: [this.data.identifier2],
      identifier3: [this.data.identifier3],
      collectionId: [this.data.collectionId],
      locator: [this.data.locator],
      citation: [this.data.tanNumber],
      relatedDocument: [this.data.tanNumber],
      registryNumber: [this.data.collectionId],
      diseaseName1: [this.data.diseaseName1],
      diseaseName2: [this.data.diseaseName2],
      diseaseName3: [this.data.diseaseName3],
      ligandVersions: [this.data.ligandVersionSlno2.ligandVersion],
      target: [this.data.target],
      targetVersion: [this.data.targetVersion],
      collectionId1: [this.data.collectionId1],
      original: [this.data.original],
      acronym: [this.data.acronym],
      organism: [this.data.organism],
      variant: [this.data.variant],
  });



  }



  
 
  onEdit() {

    alert("Welcome");

    // this.CheckedForm.patchValue({
      
      
      // 'tanNumber': this.data.tanNumber,

    // })
   

    console.log("Hi");
    
  }

onCancelClick() {
    this.activeModal.close('No');
  }

}
