import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {LoginService} from "./login.service";

@Injectable()
export class AuthGaurdService implements CanActivate{

  canActivate(){
    if(!this.ls.loginCheck()){
      console.log("AuthGaurd Activated: Logged in false");
      this.router.navigate(['/login']);
      return false;
    }
    else if(this.ls.loginCheck()){
      console.log("AuthGaurd Activated: Logged in true");
      return true;
    }
  }
  constructor(private ls:LoginService,private router:Router) { }

}
