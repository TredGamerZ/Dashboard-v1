import { Injectable } from '@angular/core';
import {Course} from "../models/course";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {coreCourse} from "../interfaces/coreCourse";
import {throws} from "assert";
import {concatStatic} from "rxjs/operator/concat";

@Injectable()
export class CourseService {

  mAllCourses:Course[]=[];
  mMyCourses:any;
  showAllCourse:boolean=false;

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


  getAllCourses():Observable<any>{
    return this.http.post('http://localhost:3000/api/getall','')
      .map((res:Response) => res.json());
  }

  getAllBaseCourse():Observable<any>{
    return this.http.post('http://localhost:3000/api/getAllBase','')
      .map((res:Response) => res.json());
  }

  createBaseCoures(tid:string,cid:string){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/api/saveBaseCourse',{"tid":tid,"cid":cid},options)
      .map((res:Response)=>{res.text()});
  }
  joinBaseCourse(uid:string,pid:string){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/api/joinBaseCourse',{"uid":uid,"pid":pid},options)
      .map((res:Response)=>{res.text()});
  }
  getMyCourses(tid:string):Observable<any>{
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/getBaseCourse',{"tid":tid},options)
      .map((res:Response)=> res.json());
  }

  getCourseById(pid:string):Observable<any>{
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/getBaseCourseById',{"pid":pid},options)
      .map((res:Response)=> res.json());
  }
  addMessage(uid:string,message:string,time:string,pid:string){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    this.http.post('http://localhost:3000/api/addMessage',{"pid":pid,"uid":uid,"time":time,"message":message},options)
      .map((res:Response)=> res.json()).subscribe(
      data =>{ console.log('Added Successfully')},
      err=>{},
    )
  }
  getMessages(pid:string):Observable<any>{
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/getMessages',{'pid':pid},options)
      .map((res:Response)=> res.json());
  }
  // getCourseWithId(id:string):Course{
  //   let mc:Course;
  //   for(let i:number=0; i<this.mAllCourses.length;i++){
  //     if(this.mAllCourses[i].ID == id )
  //     {
  //       mc = this.mAllCourses[i];
  //       return mc;
  //
  //     }
  //   }
  // }


  constructor(
    private http : Http,
  ) {


    for(let i:number =1 ; i<10 ;i++){
      let newcourse: Course = new Course('BT20'+i,'ID10'+i,'Nunc sed urna condimentum, ',2);
      this.mAllCourses.push(newcourse);
    }

  }

}
