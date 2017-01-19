import {Component, OnInit, PipeTransform, Pipe, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseboardService} from "../services/courseboard.service";
import {Board} from "../models/board";
import {Message} from "../models/message";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
// ModalModule
import {AssignmentService} from "../services/assignment.service";
import {Assignment} from "../models/Assignment";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css'],
  providers:[CourseboardService,UserService,AssignmentService],

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
  assignments: Assignment[];
  constructor(private route: ActivatedRoute,
              private cbs:CourseboardService,
              private userService:UserService,
              private assignmentService:AssignmentService,
              private cvr:ViewContainerRef,
              public modal:Modal,
              private overlay:Overlay) {
    overlay.defaultViewContainer = cvr;
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
    this.assignments = this.assignmentService.getAssignments(this.cid);

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
      let message:Message = new Message('now',str,this.cid,this.mUser._id,false);
      this.messages.push(message);
    }
    else if(this.validateYouTubeUrl(str)){
        let url = this.validateYouTubeUrl(str);
      let message:Message = new Message('now',url,this.cid,this.mUser._id,true);
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

  onDelete(mid:string){
    console.log(mid+' is the id');
  }

  onEdit(mid:string){
    this.modal.confirm()
      .size('lg')
      .showClose(true)
      .title('A simple Alert style modal window')
      .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non"asdfsf"</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
      .open();
    console.log(mid+' is the id');
  }
}

