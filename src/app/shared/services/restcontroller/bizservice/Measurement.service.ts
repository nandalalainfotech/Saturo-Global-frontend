import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Measurement001wb } from "../entities/Measurement001wb";

@Injectable()
export class MeasurementManager extends BaseService {
    private measurementUrl: string = `${environment.apiUrl}/measurement`

    allmeasurement() {
        return this.getCallService(`${this.measurementUrl}` + "/findAll");
    }

    measurementsave(measurement001wb: Measurement001wb) {
        return this.postCallService(`${this.measurementUrl}` + "/save", {}, measurement001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.measurementUrl}`, data);
    }

    measurementupdate(measurement001wb: Measurement001wb) {
        return this.putCallService(`${this.measurementUrl}` + "/update", {}, measurement001wb);
    }

    measurementdelete(slNo: any) {
        let data: any = {};
        data['slNo'] = slNo;
        return this.deleteCallService(`${this.measurementUrl}` + "/delete", data);
    }
}