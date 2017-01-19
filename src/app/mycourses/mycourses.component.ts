import {Component, OnInit, OnChanges} from '@angular/core';
import {Course} from "../models/course";
import {CourseService} from "../services/course.service";
import {UserService} from "../services/user.service";
// import {userStudent} from "../models/student";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {cpus} from "os";
import {userInfo} from "os";

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css'],
  providers:[CourseService,UserService],
  inputs:['user']
})
export class MycoursesComponent implements OnInit,OnChanges {

  allcourses:Course[]= [];
  mycourses:Array<Object> = [];
  user:User;
  showAllCourse:boolean = false;
  alert:any;
  constructor(private courseService:CourseService,private userService:UserService,    private router: Router) {

    // this.user = this.mUser;
    // console.log(this.user);
  }

   toggleThis(bool: boolean) {
    this.showAllCourse = this.showAllCourse!= true;

  }
  onAddCourse(id:string):void{
    if(!this.user.type) {
      let cid: string = id;
      let tid: string = this.user._id;

      this.courseService.createBaseCoures(tid, cid).subscribe(
        data => {
          this.alert = data;

          console.log("Added Successfully");

        },
        err => {
          console.log(err)
        },
      );
    }

    else {
      let cid: string = id;
      let tid: string = this.user._id;

      this.courseService.joinBaseCourse(tid, cid).subscribe(
        data => {
          this.alert = data;

          console.log("Joined Successfully");

        },
        err => {
          console.log(err)
        },
      );
    }
  }
  onCourse(id:string):void{
    this.router.navigate(['/course', id] );
  }
  ngOnInit() {
    console.log(this.user);
    if(this.user.type==0){
      this.courseService.getMyCourses(this.user._id)
        .subscribe(
          data=>{
            let ar:any = data;
            console.log("Recived My Course")
            console.log(ar);
            // for(var i=0;i<ar.length;i++){
            //   this.mycourses.push(ar[i].course);
            // }
            // console.log(this.mycourses);
            this.mycourses = ar;
          },
          err=>{console.log(err)}
        );

      this.courseService.getAllCourses()
        .subscribe(
          data =>{

            this.allcourses = data;
            console.log("Courses Received");
            console.log(this.allcourses);
          },
          err =>{console.log(err)}
        );



    }
    else if(this.user.type == 1){

      for(var i = 0 ; i< this.user.courses.length; i++){
        this.courseService.getCourseById(this.user.courses[i]).subscribe(
          data =>{
            let ar = data;
            console.log(ar);
            this.mycourses.push(ar[0]);
          },
          err =>{
            console.log(err);
          }
        )
      }
      this.courseService.getAllBaseCourse()
        .subscribe(
          data =>{

            this.allcourses = data;
            console.log("Courses Received");
            console.log(this.allcourses);
          },
          err =>{console.log(err)}
        );
    }

  }
  ngOnChanges(){
    // this.allcourses = this.courseService.getAllCourses();
    // this.mycourses = this.courseService.getMyCourses(this.user._id);
  }
}
