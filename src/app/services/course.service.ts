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

  createBaseCoures(tid:string,cid:string){
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });
    return this.http.post('http://localhost:3000/api/saveBaseCourse',{"tid":tid,"cid":cid},options)
      .map((res:Response)=>{res.text()});
  }

  getMyCourses(tid:string):Observable<any>{
    let headers      = new Headers({ 'Content-Type': 'application/json' });
    let options       = new RequestOptions({ headers: headers });

    return this.http.post('http://localhost:3000/api/getBaseCourse',{"tid":tid},options)
      .map((res:Response)=> res.json());

    // for(let i:number=0; i<this.mAllCourses.length;i++){
    //   for(let j:number=0;j<courseArray.length;j++){
    //     if(this.mAllCourses[i].ID.toString()==courseArray[j]){
    //       this.mMyCourses.push(this.mAllCourses[i]);
    //     }
    //   }
    // }

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
