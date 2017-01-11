import {Component, OnInit, PipeTransform, Pipe} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseboardService} from "../services/courseboard.service";
import {Board} from "../models/board";
import {Message} from "../models/message";
import {User} from "../models/user";
import {UserService} from "../services/user.service";


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css'],
  providers:[CourseboardService,UserService],

})

export class CoursepageComponent implements OnInit {

  mCourseBoard:Board;
  messages:Message[]=[];
  mUser:User;
  loggedIn:boolean= false;
  discription:boolean= false;
  courseStructure:boolean= false;
  disscussion:boolean= true;
  cid:string;

  constructor(private route: ActivatedRoute,private cbs:CourseboardService,private userService:UserService) {

  }
  loginTeacher(){

    if(this.userService.facultyLogin('teacher','teacher')){
      this.mUser =this.userService.getUser();
      this.loggedIn = this.userService.loggedIn;
      console.log(this.mUser);
    }

  }
  loginStudent(){
    if(this.userService.studentLogin('student','student')){
      this.mUser = this.userService.getUser();
      this.loggedIn = this.userService.loggedIn;
      // console.log(this.loggedIn);
    }
  }
  ngOnInit() {
    this.cid = this.route.snapshot.params['id'];
    // this.cbs = new CourseboardService(id+'');
    this.cbs.startService(this.cid);
    this.mCourseBoard = this.cbs.getObject();
    this.messages = this.mCourseBoard.boardMesssage;
    this.mUser = this.userService.getUser();
    console.log(this.mUser);
  }

  toggleThis(i:number):void{
    if(i==1){
      this.discription = true;
      this.disscussion = false;
      this.courseStructure = false;
    }
    else if(i==2){
      this.discription = false;
      this.disscussion = true;
      this.courseStructure = false;
    }
    else if(i==3)
    {
      this.discription = false;
      this.disscussion = false;
      this.courseStructure = true;
    }
  }

  makeAnnouncement(str:string):void{

  }
  dropMessage(str:string):void{

    if(this.validateYouTubeUrl(str)==false){
      let message:Message = new Message('now',str,this.cid,this.mUser.id,false);
      this.messages.push(message);
    }
    else if(this.validateYouTubeUrl(str)){
        let url = this.validateYouTubeUrl(str);
      let message:Message = new Message('now',url,this.cid,this.mUser.id,true);
      this.messages.push(message);
    }

  }


  validateYouTubeUrl(str: string):any {
  let url = str;
  let endUrl: string;
  if (url != undefined || url != '') {
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length == 11) {
      // Do anything for being valid
      // if need to change the url to embed url then use below line
      endUrl = 'https://www.youtube.com/embed/' + match[2] ;
      // let output: string = '<iframe src="' + endUrl + '"  ></iframe>';
      let output:string = '<div class="embed-responsive embed-responsive-4by3"> <iframe class="embed-responsive-item" src="'+endUrl+'"></iframe> </div>'

      console.log(output);
      return output;
    }
    else {
      return false;
      // Do anything for not being valid
    }
  }
}

}

