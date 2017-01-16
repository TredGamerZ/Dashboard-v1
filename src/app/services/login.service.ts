import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import * as http from "selenium-webdriver/http";
import {Observable} from "rxjs";
import {equal} from "assert";
import * as e from "express";

@Injectable()
export class LoginService {

   loggedIn:boolean;
   alert:any;

  studentLogin(rollno: string, pass:string):boolean{
    if(rollno == "student" && pass== "student")
    {
      this.loggedIn = true;
      return true;
    }
    else
      return false;
    //TODO: connect with express and do actual login + add cookies
  };
  facultyLogin(name:string,pass:string):boolean{
    if(name == "teacher" && pass =="teacher" ){
      this.loggedIn = true;

      return true;

    }
    else
      return false;
    //TODO: connect with express and do actual login + add cookies
  };

  loginCheck():boolean{

    if(localStorage.getItem('userId')){
      this.loggedIn = true;
      return true;
    }
    return false;
    //TODO: check cookies if signed in
  };

  registerUser(form:any):Observable<any>{
    let bodyString = JSON.stringify(form); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });


     return this.http.post("http://localhost:3000/users/register",form,options)
      .map((res:Response) => res.text());
      // ...and calling .json() on the response to return data
      // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));//...errors if

  }
  login(form:any):Observable<boolean>{
    // let bodyString = JSON.stringify(form); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });

    return this.http.post("http://localhost:3000/users/login",form,options)
      .map(
        (res:Response) => {
          let data =res.text();
          if(data != 'u1'){
            localStorage.setItem('userId',data);
            this.loggedIn = true;
            return true;
          }
          else return false;
        }
      );
  }
  constructor(private http:Http) { }

}
