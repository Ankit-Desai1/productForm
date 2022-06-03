import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent implements OnInit {

  product:any;
  newGroup:any;
  passingData:any;
  data:any= [];
  getObject:any='';
  number:any;
  message:string='';
  showform:boolean = true;
  isEdit:boolean = false;
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  addForm :FormGroup | any;
  // selectProduct = [
  //   {name: "Clothes"},
  //   {name: "Shoes"},
  //   {name: "Toy"},
  //   {name: "Mobile"},
  //   {name: "Headphone"},
  // ];
  selectProduct = ["Clothes","Shoes","Toy","Mobile","Headphone"];

  constructor(private _fb:FormBuilder, private updatedData:DataService ,private route:Router) { 
    this.addForm = this._fb.group({
      products: this._fb.array([this.addProduct()])
    });
  }
  
  ngOnInit(): void {
    this.newGroup= this.updatedData.sendData();
    this.number= this.updatedData.sendIndex();
    this.isEdit=this.updatedData.sendIsEdit();
    if(this.newGroup != null){
      this.message= JSON.parse(this.newGroup);
      this.data=this.message;
    }
  }

  submit(){
    for (let entry of this.addForm.value.products) {
      this.data.push(entry); 
    }
    this.showform = ! this.showform;
    this.addForm.reset(); 
    this.addForm = this._fb.group({
      products: this._fb.array([this.addProduct()])
    });
    setTimeout(() => this.showform = true); 
    console.log(this.data);
    this.passingData = JSON.stringify(this.data);
    this.getObject=JSON.parse(this.passingData);
    this.updatedData.getData(this.passingData);
  }

  get formArr(){
    return this.addForm.get("products") as FormArray;
  }
  
  addProduct(){
    return this._fb.group({
      name:'',
      category:'',
      price:'',
      description:'',
    });
  }

  addnewP(){
    this.formArr.push(this.addProduct());
  }

  update(){
    this.getObject= JSON.parse(this.newGroup);
    this.product=this.addForm.value.products[0];
    console.log(this.addForm.value.products);
    this.getObject[this.number]= this.product;
    this.passingData = JSON.stringify(this.getObject);
    this.updatedData.getData(this.passingData);
    this.route.navigate(['admin/productList']);
    this.isEdit=!this.isEdit;
    this.updatedData.getIsEdit(this.isEdit);
  }
}
