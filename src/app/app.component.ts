import {Component, OnInit, OnChanges} from '@angular/core';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent implements OnInit,OnChanges{
  loggedIn:boolean;

  constructor(private loginService:LoginService){
    this.loggedIn = this.loginService.loginCheck();
  }
  ngOnInit(){
  }
  ngOnChanges(){
    this.loggedIn = this.loginService.loginCheck();

  }

  onLogout(){
    console.log("logged Out");
    this.loginService.logout();
    this.loggedIn = this.loginService.loginCheck();

  }

}
