import { Component, OnInit , Output , EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit ,OnChanges {
 
  message:any;
  isShow:boolean=false;
  name = new FormControl('', [Validators.required]);
  changedName:string ='';
  getObject: any;
  msg:string | undefined;
  
  @Input() show:string | undefined;
  @Output() transferdata: EventEmitter<string > = new EventEmitter(); 
 
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getObject= this.show;
    if(this.getObject!= null && this.getObject == 0){
      this.isShow = !this.isShow;
    }
  }

  ngOnInit(): void {
  }

  nameForm= new FormGroup({
    name: new FormControl('',Validators.required),
  }) 

  update(){
    this.changedName= this.nameForm.value.name;
    this.transferdata.emit(this.changedName);
    this.isShow = !this.isShow;

  }

}
