import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup,Validators,FormControl, FormArray, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { DataService} from "../data.service";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  addForm :FormGroup | any;
  data:any= [];
  updatedProduct:any;
  no: any;
  showform:boolean = true;
  message:any;
  newGroup:string='';
  passingData:string='';
  getObject:string='';

  constructor(private _fb:FormBuilder, private updatedData:DataService) { 
    this.addForm = this._fb.group({
      products: this._fb.array([this.addProduct()])
    });
  }

  ngOnInit(): void {
    this.newGroup=this.updatedData.sendData();
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

  remove(element: any){
    if(window.confirm('Are sure you want to delete this item ?')){
      this.data.forEach((value:any,index:any) => {
        if(value == element)
        this.data.splice(index,1)
      });
    } 
  }
  
  edit(element: any){
    let index = this.data.indexOf(element);
    this.no = index;
    this.passingData = JSON.stringify(this.data);
    this.getObject=JSON.parse(this.passingData);
    this.updatedData.getData(this.passingData);
    this.updatedData.getIndex(this.no);
  }

  updateForm= new FormGroup({
    name: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  }) 

}
function n(n: any) {
  throw new Error('Function not implemented.');
}

