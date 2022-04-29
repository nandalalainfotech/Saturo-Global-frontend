import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { DashBoardComponent } from './dash-board.component';

const routes: Routes = [
  {
    path: "",
    component: DashBoardComponent,
    children: [
      {
        path: "",
        component: BodyComponent,
      },
      {
        path:'app-sidemenu-dashboard',
        loadChildren:() => import("./sidemenu-dashboard/sidemenu-dashboard.module").then(m => m.SidemenuDashboardModule)
      },
      {
        path: 'app-manufacturing',
        loadChildren: () => import("./manufacturing/manufacturing.module").then(m => m.ManufacturingModule)
      },
      {
        path: 'app-setting',
        loadChildren: () => import("./setting/setting.module").then(m => m.SettingModule)
      },
      {
        path: 'app-ligand',
        loadChildren: () => import("./ligand/ligand.module").then(m => m.LigandModule)
      },
      {
        path: 'app-target',
        loadChildren: () => import("./target/target.module").then(m => m.TargetModule)
      },
      {
        path: 'app-assay',
        loadChildren: () => import("./assay/assay.module").then(m => m.AssayModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
