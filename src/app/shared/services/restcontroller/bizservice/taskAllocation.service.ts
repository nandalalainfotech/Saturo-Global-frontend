import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Taskallocation001wb } from "../entities/Taskallocation001wb";

@Injectable()
export class TaskAllocationManager extends BaseService {
    private taskallocationUrl: string = `${environment.apiUrl}/taskallocation`

    alltask() {
        let data: any = {};
        // data['username'] = username;
        return this.getCallService(`${this.taskallocationUrl}` + "/findAll");
    }

    tasksave(taskallocation001wb: Taskallocation001wb) {
        
        return this.postCallService(`${this.taskallocationUrl}` + "/save", {}, taskallocation001wb);
    }

    findOne(id: any) {
        let data: any = {};
        data['id'] = id;
        return this.getCallService(`${this.taskallocationUrl}`, data);
    }

    taskupdate(taskallocation001wb: Taskallocation001wb) {
        return this.putCallService(`${this.taskallocationUrl}` + "/update", {}, taskallocation001wb);
    }

    taskdelete(curatorId: any) {
        let data: any = {};
        data['curatorId'] = curatorId;
        return this.deleteCallService(`${this.taskallocationUrl}` + "/delete", data);
    }
}