import { Component, OnInit } from '@angular/core';
import {AssignmentService} from "../services/assignment.service";
import {Assignment} from "../models/Assignment";
import {Observable} from "rxjs";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css'],
  providers: [AssignmentService],
  inputs: ['assignment']
})
export class AssignmentComponent implements OnInit {

  assignment: Assignment;
  cur: Date;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader = new FileUploader({url : "#"});
  constructor(private assignmentService: AssignmentService) { this.cur = new Date();}

  ngOnInit() {
    let timer = Observable.timer(2000, 1000);
    timer.subscribe(() => {this.cur = new Date();});


  }

  public fileOverBase(e: any): void{
    this.hasBaseDropZoneOver = e;
  }
}
