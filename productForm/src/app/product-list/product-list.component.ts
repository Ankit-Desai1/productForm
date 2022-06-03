import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService} from "../data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product:any;
  newGroup:any;
  passingData:any;
  data:any;
  getObject:any='';
  number:any;
  name = new FormControl('', [Validators.required]);
  category = new FormControl('', [Validators.required]);
  price = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  constructor(private updatedData:DataService, private route:Router) { }
  
  ngOnInit(): void {
    this.newGroup= this.updatedData.sendData();
    this.number= this.updatedData.sendIndex();
  }
  
  updateForm= new FormGroup({
    name: new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  }); 

  update(){
    this.getObject= JSON.parse(this.newGroup);
    this.product=this.updateForm.value;
    this.getObject[this.number]= this.product;
    this.passingData = JSON.stringify(this.getObject);
    this.updatedData.getData(this.passingData);
    this.route.navigate(['/product']);
  }
}
