import { Injectable } from '@angular/core';
import {Course} from "../models/course";

@Injectable()
export class CourseService {

  mAllCourses:Course[]=[];
  mMyCourses:Course[]=[];
  showAllCourse:boolean=false;

  getAllCourses():Array<Course>{
    return this.mAllCourses;
  }

  getMyCourses(courseArray:Array<string>):Array<Course>{
    this.mMyCourses = [];
    for(let i:number=0; i<this.mAllCourses.length;i++){
      for(let j:number=0;j<courseArray.length;j++){
        if(this.mAllCourses[i].ID.toString()==courseArray[j]){
          this.mMyCourses.push(this.mAllCourses[i]);
        }
      }
    }
    return this.mMyCourses;
  }

  getCourseWithId(id:string):Course{
    let mc:Course;
    for(let i:number=0; i<this.mAllCourses.length;i++){
      if(this.mAllCourses[i].ID == id )
      {
        mc = this.mAllCourses[i]
        return mc;

      }
    }
  }


  constructor() {


    for(var i:number =1 ; i<10 ;i++){
      let newcourse: Course = new Course('BT20'+i,'ID10'+i,'Nunc sed urna condimentum, ');
      this.mAllCourses.push(newcourse);
    }

  }

}
