import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { AsyncValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  constructor(private route:Router, private auth:AuthService) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.route.navigate(['admin']);
    }
  }

  loginForm= new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,15}/)]),
  }); 

  login(){
    this.auth.login(this.loginForm.value).subscribe(
      (result) => {
        console.log(result);
        this.route.navigate(['/admin']);
      },
      (err: Error) => {
        alert(err.message);
      }
    )
  }

  getErrorMessage() {
    return this.loginForm.controls['password'].hasError('required') ? 'Password is required' :
        this.loginForm.controls['password'].hasError('pattern') ? 'Password have atleast one Capital letter, small letter, number and length is between 6 to 15' :
           '';
  }

}
