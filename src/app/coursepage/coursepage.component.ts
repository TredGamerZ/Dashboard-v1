import {Component, OnInit, PipeTransform, Pipe, ViewContainerRef, OnChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseboardService} from "../services/courseboard.service";
import {Message} from "../models/message";
import {User} from "../models/user";
import {UserService} from "../services/user.service";
import {AssignmentService} from "../services/assignment.service";
import {Assignment} from "../models/Assignment";
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {CourseService} from "../services/course.service";
import {LoginService} from "../services/login.service";
import * as io from 'socket.io-client';


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css'],
  providers:[CourseboardService,UserService,LoginService,AssignmentService,CourseService],

})

export class CoursepageComponent implements OnInit,OnChanges {

  mCourseBoard:any;
  messages:Array<Object>=[];
  mUser:User;

  loggedIn:boolean= false;
  discription:boolean= false;
  courseStructure:boolean= false;
  disscussion:boolean= true;
  currTime: Date = new Date();
  socket;
  cid:string;
  assignments: Assignment[];
  isDataAvailable:boolean =false;

  announces:Array<string>=['No class on monday','Read papers on biofuels'];

  dataCheck:boolean=false;
  constructor(
    private route: ActivatedRoute,
    private cbs:CourseboardService,
    private userService:UserService,
    private assignmentService:AssignmentService,
    private cvr:ViewContainerRef,
    public modal:Modal,
    private overlay:Overlay,
    private loginService:LoginService,
    private courseService:CourseService)
  {
    this.isDataAvailable =false;
    overlay.defaultViewContainer = cvr;
    this.loggedIn = this.loginService.loginCheck();




  }


  initiatePage(id:string){

    for(var i=0;i<this.mUser.courses.length;i++){
      if(id == this.mUser.courses[i]){
        this.isDataAvailable= true;
      }
    }
  }
  ngOnInit() {


    this.userService.getUserById(localStorage.getItem('userId'))
      .subscribe(
        data => {
          if(data=='false'){
            console.log("Server error");
            return false;
          }
          // console.log(data);
          // console.log("User Recived");

          this.mUser = data;
          // console.log(this.mUser);

          this.cid = this.route.snapshot.params['id'];

          this.courseService.getCourseById(this.cid)
            .subscribe(
              data=>{
                this.mCourseBoard = data[0];
                console.log("RECIVED BOARD");
                console.log(data);
                this.isDataAvailable=true;

                this.socket=io();
                this.socket.emit('idOf',this.mCourseBoard.pageId);

                this.socket.on('announce',(msg) =>{
                  // this.announces.push(msg);
                  console.log(msg);
                  this.announces.push(msg)
                });

              },
              err=>{console.log(err)}
            );


          this.courseService.getMessages(this.cid).subscribe(
            data=>{
              this.messages = data[0].messages;
              console.log(this.messages);
            },
            err=>{console.log(err)}
          );


        },
        err =>{console.log(err)}
      );


    // ASSIGNMENT SERVICE ================================================
    // this.assignments = this.assignmentService.getAssignments(this.cid);

    // console.log(this.mUser);
  }
  emitMessage(){
    // this.socket.emit("message",'VOILA BITCHES');
    this.socket.emit('check');

  }
  //
  // pushAnnouncement(msg:string){
  //   this.announces.push(msg);
  // }
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
      // let message:Message = new Message('now',str,this.cid,this.mUser._id,false,this.currTime);

      this.courseService.addMessage(this.mUser._id,str,this.currTime.toString(),this.mCourseBoard.pageId);

      this.messages.push({
        'message':str,
        'senderId': {
          '_id':this.mUser._id,
          'name':this.mUser.name,
        },
        'date':this.currTime,
      });
    }
    else if(this.validateYouTubeUrl(str)){
        let url = this.validateYouTubeUrl(str);
      let message:Message = new Message('now',url,this.cid,this.mUser._id,true);
      this.messages.push(message);
    }

  }

  ifYourMessage(id:string){
    if(id == this.mUser._id){
      return '#d2e8d2';
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

  ngOnChanges(){

}
}

