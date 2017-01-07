import { Component, OnInit } from '@angular/core';
import {userStudent} from "../models/student";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  model = new userStudent('','','','','','');
  studentCheck:boolean;
  facultyCheck:boolean;

  onFaculty(){
    this.facultyCheck=true;
    this.studentCheck=false;
  }
  onStudent(){
    this.studentCheck=true;
    this.facultyCheck=false;
  }
  constructor(private loginService:LoginService,private router:Router) {

  this.studentCheck = false;
  this.facultyCheck = false;
  }

  onSubmit(){
    if(this.loginService.studentLogin(this.model.roll,this.model.pass)){
        alert('Logged In');
      this.router.navigate(['/dashboard']);
    }
    else
      return false;
  }
  ngOnInit() {

  }

}
