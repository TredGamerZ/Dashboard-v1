/**
 * Created by m on 1/7/2017.
 */
export class Message{
  constructor(id: string, message: string, courseId: string, senderId: string, link:boolean) {
    this.id = id;
    this.message = message;
    this.courseId = courseId;
    this.senderId = senderId;
    this.link = link;
  }
  id:string;
  message:string;
  date:string;
  courseId:string;
  senderId:string;
  link:boolean;
}
