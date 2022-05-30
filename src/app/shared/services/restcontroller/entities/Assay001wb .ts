import { Assaytype001mb } from "./Assaytype001mb";
import { Ligand001wb } from "./Ligand001wb";
import { Ligandversion001mb } from "./Ligandversion001mb";
import { Routeofadministration001mb } from "./Routeofadministration001mb";
import { Toxicity001mb } from "./Toxicity001mb";
import { Unitlowendvalue001mb } from "./Unitlowendvalue001mb";
import { Unitsinglevalue001mb } from "./Unitsinglevalue001mb";

export class Assay001wb {
    assayId?: number;
    ordinal?: string;
    collectionId?: string;
    ligandSlno?: number;
    assayTypeSlno?: number;
    toxiCitySlno?: number;
    routeSlno?: number;
    ligandSvalue?: string;
    unitSlno?: number;
    ligandHvalue?: string;
    ligandLvalue?: string;
    unitsSlno?: number;
    administration?: string;
    procedure?: string;
    target?: string;
    conditionType?: string;
    conditionMaterial?: string;
    conditionMaterialid?: string;
    singleCondition?: string;
    singleUnit?: string;
    highCondition?: string;
    lowCondition?: string;
    highLowUnit?: string;
    unitedSlno?: number;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;

    ligandSlno2?: Ligand001wb;
    assayTypeSlno2?: Assaytype001mb;
    toxiCitySlno2?: Toxicity001mb;
    routeSlno2?: Routeofadministration001mb;
    unitSlno2?: Unitsinglevalue001mb;
    unitedSlno2?: Unitlowendvalue001mb;
   
    
    
}
