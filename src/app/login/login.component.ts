import { Component, OnInit } from '@angular/core';
// import {userStudent} from "../models/student";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {User} from "../models/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService]
})
export class LoginComponent implements OnInit {

  model:User;
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
    if(this.loginService.studentLogin(this.model.username,this.model.password)){
        alert('Logged In');
      this.router.navigate(['/dashboard']);
    }
    else
      return false;
  }
  ngOnInit() {

  }

}
