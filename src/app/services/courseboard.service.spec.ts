/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseboardService } from './courseboard.service';

describe('CourseboardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseboardService]
    });
  });

  it('should ...', inject([CourseboardService], (service: CourseboardService) => {
    expect(service).toBeTruthy();
  }));
});
