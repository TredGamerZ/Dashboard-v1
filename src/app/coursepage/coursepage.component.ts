import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CourseboardService} from "../services/courseboard.service";

@Component({
  selector: 'app-coursepage',
  templateUrl: './coursepage.component.html',
  styleUrls: ['./coursepage.component.css'],
  providers:[CourseboardService]
})
export class CoursepageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    // this.cbs = new CourseboardService(id+'');

  }

}
