import { Component, Input, OnChanges, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnChanges {
  userName='admin';
  isShow:Boolean=false;
  show:string='0';
  
  @Input() getname:string | undefined;
  @Output() editName: EventEmitter<string> = new EventEmitter();
  getObject: any;
  passingData: string='';
  

  constructor(private auth:AuthService , private route:Router) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.getObject= this.getname;
    if(this.getObject != null){
      this.userName=this.getObject;
    }
  }

  ngOnInit(): void {
    
  }

  logout(){
    this.auth.logout();
    this.route.navigate(['login']);
  }
  change(){
    this.editName.emit(this.show);
  }

}
