import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseboardService} from "../services/courseboard.service";
import {AssignmentService} from "../services/assignment.service";
import {Assignment} from "../models/Assignment";


@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css'],
  providers:[CourseboardService, AssignmentService]
})
export class CoursepageComponent implements OnInit {

  assignments: Assignment[];
  courseId: string;

  constructor(private route: ActivatedRoute, private assignmentService: AssignmentService) {

  }

  ngOnInit() {
    this.courseId = this.route.snapshot.params['id'];
    this.assignments = this.assignmentService.getAssignments(this.courseId);
  }

}
