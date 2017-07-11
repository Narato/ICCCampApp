import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import * as _ from 'lodash';
import * as moment from 'moment';

import { TimeTableService } from '../time-table.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {
  data: any;
  dates = [];
  currentDate: Moment;
  showOnlyToday = true;
  currentActivities: any[];
  currentActivityDateIndex = 0;

  constructor(private router: Router, private timetableService: TimeTableService) {}

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') === null) {
      return this.router.navigate(['credentials']);
    }

    this.setCurrentDate();
    this.setDates();
    console.log(this.dates);

    this.timetableService.getTimeTable(localStorage.getItem('icc_campapp_username'), localStorage.getItem('icc_campapp_password'))
      .map((result) => {
        const timetable = result.timetable.filter(timetableItem => timetableItem.type === 'workshop');
        result.timetable = timetable;
        return result;
      })
      .subscribe((result) => {
        this.data = result;
        this.setCurrentActivities();
      })
  }

  selectDayBefore() {
    if (this.currentActivityDateIndex > 0) {
      this.currentActivityDateIndex--;
      this.currentDate = this.dates[this.currentActivityDateIndex];
      this.setCurrentActivities();
    }
  }

  selectDayAfter() {
    if (this.currentActivityDateIndex < this.dates.length - 1) {
      this.currentActivityDateIndex++;
      this.currentDate = this.dates[this.currentActivityDateIndex];
      this.setCurrentActivities();
    }
  }

  showTodaysActivities() {
    this.showOnlyToday = true;
    this.setCurrentActivities();
  }

  showAllActivities() {
    this.showOnlyToday = false;
  }

  private setCurrentDate() {
    // Todo: set correct first date
    this.currentDate = moment('2016-07-26', 'YYYY-MM-DD');
  }

  private setDates() {
    const date = this.currentDate.clone();
    const nrOfDays = 9;

    for (let i = 1; i <= nrOfDays; i++) {
      this.dates.push(date.clone());
      date.add(1, 'day');
    }
  }

  private setCurrentActivities() {
    const date = this.currentDate.format()
    this.currentActivities = this.data.timetable.filter(tte => tte.date.format() === date);
  }
}
