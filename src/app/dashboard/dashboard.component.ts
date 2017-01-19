import {Component, OnInit, OnChanges} from '@angular/core';
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";
import {User} from "../models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[UserService,LoginService]
})
export class DashboardComponent implements OnInit,OnChanges {

  mUser:User;
  loggedIn:boolean;
  isDataAvailable:boolean=false;

  constructor(private userService:UserService,private ls:LoginService) {


      userService.getUserById(localStorage.getItem('userId'))
        .subscribe(
        data => {
          if(data=='false'){
            console.log("Server error");
            return false;
          }
          // let curUser:User = new User(data.id,data.type,data.username,data.password,data.courses);
          console.log(data);
          console.log("User Recived");

          this.mUser = data;
          console.log(this.mUser);
          this.isDataAvailable = true;
        },
        err =>{console.log(err)}
      );
  }
  loginTeacher(){

    // if(this.userService.facultyLogin('teacher','teacher')){
    //   this.mUser =this.userService.getUser();
    //   this.loggedIn = this.userService.loggedIn;
    //   console.log(this.mUser);
    // }

  }
  loginStudent(){
    // if(this.userService.studentLogin('student','student')){
    //   this.mUser = this.userService.getUser();
    //   this.loggedIn = this.userService.loggedIn;
    //   console.log(this.loggedIn);
    // }
  }
  ngOnInit() {
    this.loggedIn = this.ls.loginCheck();

  }
  ngOnChanges(){
    this.loggedIn = this.ls.loginCheck();

  }
}
