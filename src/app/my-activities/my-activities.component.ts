import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { TimeTableService } from '../time-table.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  data: any;
  dates: any;

  constructor(private router: Router, private timetableService: TimeTableService) { }

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') === null) {
      return this.router.navigate(['credentials']);
    }

    this.timetableService.getTimeTable(localStorage.getItem('icc_campapp_username'), localStorage.getItem('icc_campapp_password'))
    .map((result) => {
      const timetable = result.timetable.filter(timetableItem => timetableItem.type === 'workshop');
      result.timetable = timetable;
      return result;
    })
    .subscribe((result) => {
      this.data = result;
      const timetable = this.data.timetable;
      const flags = {}, output = [], length = timetable.length;

      for (let i = 0; i < length; i++) {
        if (flags[timetable[i].date]) { continue; }
        flags[timetable[i].date] = true;
        output.push(timetable[i].date);
      }
      this.dates = output;
    })
  }

}
