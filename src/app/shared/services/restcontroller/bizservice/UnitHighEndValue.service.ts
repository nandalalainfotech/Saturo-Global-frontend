import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Unithighendvalue001mb } from "../entities/Unithighendvalue001mb";

@Injectable()
export class UnitHighEndValueManager extends BaseService {
    private unitHighEndValueUrl: string = `${environment.apiUrl}/unitHighEndValue`

    allunitHighEndValue() {
        return this.getCallService(`${this.unitHighEndValueUrl}` + "/findAll");
    }

    unitHighEndValuesave(unithighendvalue001mb: Unithighendvalue001mb) {
        return this.postCallService(`${this.unitHighEndValueUrl}` + "/save", {}, unithighendvalue001mb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.unitHighEndValueUrl}`, data);
    }

    unitHighEndValueupdate(unithighendvalue001mb: Unithighendvalue001mb) {
        return this.putCallService(`${this.unitHighEndValueUrl}` + "/update", {}, unithighendvalue001mb);
    }

    unitHighEndValuedelete(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.deleteCallService(`${this.unitHighEndValueUrl}` + "/delete", data);
    }
}