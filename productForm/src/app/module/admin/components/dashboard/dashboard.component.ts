import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  message:string | undefined;
  isShow:string | undefined;
 
  constructor() { }

  ngOnInit(): void {
  }

  receivename($event: any){
    this.message = $event;
  }

  isEdit($event:any){
    this.isShow=$event;
  }

  
}
