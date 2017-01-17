import {Component, OnInit, OnChanges} from '@angular/core';
import {Course} from "../models/course";
import {CourseService} from "../services/course.service";
import {UserService} from "../services/user.service";
// import {userStudent} from "../models/student";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css'],
  providers:[CourseService,UserService],
  inputs:['user']
})
export class MycoursesComponent implements OnInit,OnChanges {

  allcourses:Course[]= [];
  mycourses:Course[]= [];
  user:User;
  showAllCourse:boolean = false;

  constructor(private courseService:CourseService,private userService:UserService,    private router: Router) {

    // this.user = this.mUser;
    // console.log(this.user);
  }

   toggleThis(bool: boolean) {
    this.showAllCourse = this.showAllCourse!= true;

  }
  onAddCourse(id:string):void{

    let mc:Course = this.courseService.getCourseWithId(id);
    this.mycourses.push(mc);
    // this.userService.addCourse(id);

  }
  onCourse(id:string):void{
    this.router.navigate(['/course', id] );
  }
  ngOnInit() {
    console.log(this.user);
    this.allcourses = this.courseService.getAllCourses();
    this.mycourses = this.courseService.getMyCourses(this.user.courses);
  }
  ngOnChanges(){
    this.allcourses = this.courseService.getAllCourses();
    this.mycourses = this.courseService.getMyCourses(this.user.courses);

  }
}
