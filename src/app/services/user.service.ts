import { Injectable } from '@angular/core';
import {userStudent} from "../models/student";

@Injectable()
export class UserService {

  mUser:userStudent;
  // mUserId = this.mUser.ID.toString();

  constructor() {
    this.mUser = new userStudent('STU1','Tanmay','835BT15','tanmay@awesome',4,['ID101','ID102','ID103']);
    //TODO: create getuser
  }

  getDetails():userStudent{
    return this.mUser;
  }

  addCourse(courseId:string):void{
    this.mUser.coursesArray.push(courseId);
    console.log("Course Added Successfully");
  }

}
