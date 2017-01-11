// THIS CLASS MAKES FAKE USERS FOR TESETNG AND ALL THE USER SERVICES
import { Injectable } from '@angular/core';
import {User} from "../models/user";

@Injectable()
export class UserService {

  mStudent:User;
  mTeacher:User;
  mUser:User;
  loggedIn:boolean;


  constructor() {
    this.mStudent = new User('STU1',0,'student','student',['ID101','ID102','ID103'],'https://avatars1.githubusercontent.com/u/9270746?v=3&s=460');
    this.mTeacher = new User('TEU1',1,'teacher','teacher',['ID101','ID102'],'https://avatars0.githubusercontent.com/u/6294544?v=3&s=460');
    //TODO: create getuser
  }

  studentLogin(rollno: string, pass:string):boolean{
    if(rollno == "student" && pass== "student")
    {
      this.loggedIn = true;
      this.mUser = this.mStudent;
      console.log('Logged In as Student');
      return true;
    }
    else
      return false;
    //TODO: connect with express and do actual login + add cookies
  };
  facultyLogin(name:string,pass:string):boolean{
    if(name == "teacher" && pass =="teacher" ){
      this.loggedIn = true;
      this.mUser = this.mTeacher;
      console.log('Logged In as Teacher');
      return true;

    }
    else
      return false;
    //TODO: connect with express and do actual login + add cookies
  };

  loginCheck():boolean{

    return this.loggedIn;
    //TODO: check cookies if signed in
  };

  getUser():User{
    return this.mUser;
  }

}
