import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  number:any;
  productData : any;
  isEdit=false;
  constructor() { }

  getData(data:any){
    this.productData=data;
  }

  getIndex(index:any){
    this.number = index;
  }
  
  sendData(){
    return this.productData;
  }

  sendIndex(){
    return this.number;
  }

  getIsEdit(data:any){
    this.isEdit=data;
  }

  sendIsEdit(){
    return this.isEdit;
  }
}
