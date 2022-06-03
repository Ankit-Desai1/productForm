import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

got="coffee";
  constructor(){
  }

  title = 'productForm';

  ngOnInit(): void { 
  }

  // sendData(value: any){
  //   this.value= value;
  //   console.log('hurrry' + value);
  // }

  greet(name:any){
    this.got= name;
    alert('hello' + name);
  }

}
