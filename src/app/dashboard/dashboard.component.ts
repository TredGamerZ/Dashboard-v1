import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UserService,LoginService]
})
export class DashboardComponent implements OnInit {

  mUser:User;
  loggedIn:boolean;
  constructor(private userService:UserService,private ls:LoginService) {
    // this.loggedIn = ls.loginCheck();
  }
  loginTeacher(){

    if(this.userService.facultyLogin('teacher','teacher')){
      this.mUser =this.userService.getUser();
      this.loggedIn = this.userService.loggedIn;
      console.log(this.mUser);
    }

  }
  loginStudent(){
    if(this.userService.studentLogin('student','student')){
      this.mUser = this.userService.getUser();
      this.loggedIn = this.userService.loggedIn;
      console.log(this.loggedIn);
    }
  }
  ngOnInit() {
  }

}
