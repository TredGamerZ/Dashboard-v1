import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {LoginService} from "../services/login.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {Observable} from "rxjs";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import {Router} from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[LoginService],
})
export class RegisterComponent implements OnInit {

  user:User;
  registerForm:FormGroup;

  // alert:Object = new Object({
  //   messsage:String,
  //   type:Number, // 1 for error 0 for success else don't show
  // });
  alert:any;

  submitForm(form:any):void{
    this.loginservice.registerUser(form).subscribe(
      data => {
          this.alert = data;
          // console.log("Alert Is" + this.alert);
          if(this.alert=="success"){
            console.log("SUCCESFULL LOGIN");
            this.router.navigate(['/login']);
          }
          else {
            console.log("ALERTS BICTHES");
          }
        },
        err =>{console.log("errors are: "+err)},
        );
    }

  constructor(private loginservice:LoginService,
              private fb:FormBuilder,
              private router:Router,) {

    this.registerForm = fb.group({
      'name':'',
      'username':'',
      'email':'',
      'password':'',
      'type':'1',
    });
  }

  ngOnInit() {

  }

}
