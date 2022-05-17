import { Ligand001wb } from "./Ligand001wb";
import { Ligandversion001mb } from "./Ligandversion001mb";

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
    value?: string;
    unitedSlno?: number;
    insertUser?: string;
    insertDatetime?: Date;
    updatedUser?: string | null;
    updatedDatetime?: Date | null;
    ligandSlno2?: Ligand001wb[];
    
}
