import { Injectable } from '@angular/core';
import {Board} from "../models/board";
import {Message} from "../models/message";

@Injectable()
export class CourseboardService {

  mCourseBoard:Board;

  getObject():Board{
    return this.mCourseBoard;
  }

  addMessage(message:Message){
    this.mCourseBoard.boardMesssage.push(message);
  }

  startService(mId:string){
    this.mCourseBoard.courseId = mId;
    let messages:Message[]=[];
    for(let i =0; i<2; i++){
      let message:Message= new Message(i+'',"LF will be replaced by CRLF in The file will have its original line endings in your working directory",mId,''+i,false);
      messages.push(message);

    }
    this.mCourseBoard.boardMesssage = messages;
    this.mCourseBoard.description= 'Add a wildcard route to intercept invalid URLs and handle them gracefully. A wildcard route has a path consisting of two asterisks. It matches every URL. The router will select this route if it cant match a route earlier in the configuration. A wildcard route can navigate to a custom "404 Not Found" component or redirect to an existing route.'

  }
  constructor() {
    this.mCourseBoard = new Board;

   }


}
