import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';

const routes: Routes = [
  {path:'' , component:DashboardComponent, 
    children:[
      {path:'productList', component:ProductListComponent},
      {path:'productManagement',component:ProductManagementComponent},
      {path:'' , redirectTo:'/admin/productManagement' ,pathMatch:'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
