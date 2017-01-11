import { Injectable } from '@angular/core';
import {Assignment} from "../models/Assignment";

@Injectable()
export class AssignmentService {

  constructor() { }


  getAssignments(courseId: string) {
    //TODO: Get Assignments of course id
    let assignments: Assignment[] = [];
    for(let i:number = 0; i < 3; i++){
      assignments.push(new Assignment(i + '', 'Assignment ' + i, new Date(2017,1,12), new Date()));
    }
    return assignments;
  }
}
