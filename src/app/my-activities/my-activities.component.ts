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
  currentDate: any;
  showOnlyToday: boolean;
  currentActivities: any[];
  currentActivityDateIndex: number;

  constructor(private router: Router, private timetableService: TimeTableService) { 
    this.showOnlyToday = true;
  }

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

        this.setInitialActivities();
      })
  }

  setInitialActivities() {
    if (this.dates.length > 0) {
      let today = new Date();
      this.currentActivityDateIndex = 0;
      this.currentDate = this.dates[0];
      for (let date of this.dates) {
        let datePart = date.toString().substring(date.indexOf(',') + 2, date.length);
        let day = Number(datePart.substring(0, 2));
        let month = Number(datePart.substring(3, 5));
        let year = Number(datePart.substring(6, 10));
        if (year == today.getFullYear() && month == today.getMonth() && day == today.getDate()) {
          this.currentDate == date;
          break;
        }
      }

      this.currentActivities = this.data.timetable.filter(tte => tte.date == this.currentDate);
    }
  }

  selectDayBefore() {
    // let currentDateIndex = this.dates.indexOf(this.currentDate);
    if(this.currentActivityDateIndex > 0) {
      this.currentActivityDateIndex--;
      this.currentDate = this.dates[this.currentActivityDateIndex];
      this.currentActivities = this.data.timetable.filter(tte => tte.date == this.currentDate);
    }
  }

  selectDayAfter() {
    // let currentDateIndex = this.dates.indexOf(this.currentDate);
    if(this.currentActivityDateIndex < this.dates.length - 1) {
      this.currentActivityDateIndex++;
      this.currentDate = this.dates[this.currentActivityDateIndex];
      this.currentActivities = this.data.timetable.filter(tte => tte.date == this.currentDate);
    }
  }

  showTodaysActivities() {
    this.showOnlyToday = true;
      this.setInitialActivities();
  }

  showAllActivities() {
    this.showOnlyToday = false;
  }
}
