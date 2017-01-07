import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

   loggedIn:boolean;

  studentLogin(rollno: string, pass:string):boolean{
    if(rollno == "835BT15" && pass== "pass")
    {
      this.loggedIn = true;
      return true;
    }
    else
      return false;
    //TODO: connect with express and do actual login + add cookies
  };
  facultyLogin(name:string,pass:string):boolean{
    if(name == "tanmay" && pass =="pass" ){
      return true
    }
    else
      return false
    //TODO: connect with express and do actual login + add cookies
  };

  loginCheck():boolean{

    return this.loggedIn;
    //TODO: check cookies if signed in
  };


  constructor() { }

}
