import { Component, OnInit } from '@angular/core';
import {Course} from "../models/course";
import {CourseService} from "../services/course.service";
import {UserService} from "../services/user.service";
import {userStudent} from "../models/student";

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css'],
  providers:[CourseService,UserService]
})
export class MycoursesComponent implements OnInit {

  allcourses:Course[]= [];
  mycourses:Course[]= [];
  user:userStudent;
  showAllCourse:boolean = false;

  constructor(private courseService:CourseService,private userService:UserService) {

    this.user = this.userService.getDetails();
    this.allcourses = courseService.getAllCourses();
    this.mycourses = courseService.getMyCourses(this.user.coursesArray);

  }

   toggleThis(bool: boolean) {
    this.showAllCourse = this.showAllCourse!= true;

  }
  onAddCourse(id:string):void{

    let mc:Course = this.courseService.getCourseWithId(id);
    this.mycourses.push(mc);
    this.userService.addCourse(id);

  }
  ngOnInit() {
  }
}
