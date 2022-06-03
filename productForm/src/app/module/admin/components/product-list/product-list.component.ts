import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'description','action'];
  data:any= [];
  updatedProduct:any;
  no: any;
  isEdit:boolean = true;
  message:any;
  newGroup:string='';
  passingData:string='';
  getObject:string='';
  dataSource: MatTableDataSource<any> = new MatTableDataSource(this.data);
  
  constructor( private updatedData:DataService ,private route:Router) { 
  }

  @Output() transfer : EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.refresh();
  }

  remove(element: any){
    if(window.confirm('Are sure you want to delete this item ?')){
      this.data.forEach((value:any,index:any) => {
        if(value == element)
        this.data.splice(index,1);
      });
    } 
    this.passingData = JSON.stringify(this.data);
    this.updatedData.getData(this.passingData);
    this.refresh();
  }
  
  edit(element: any){
    let index = this.data.indexOf(element);
    this.no = index;
    this.passingData = JSON.stringify(this.data);
    this.getObject=JSON.parse(this.passingData);
    this.updatedData.getData(this.passingData);
    this.updatedData.getIndex(this.no);
    this.updatedData.getIsEdit(this.isEdit);
    this.route.navigate(['admin/productManagement']);
  }

  refresh(){
    this.newGroup=this.updatedData.sendData();
    if(this.newGroup != null){
      this.message= JSON.parse(this.newGroup);
      this.data=this.message;
    }
    this.dataSource=new MatTableDataSource(this.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

