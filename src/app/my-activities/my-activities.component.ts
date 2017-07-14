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

  NR_OF_DAYS = 9;
  FIRST_DAY = '2016-07-26';
  DATE_FORMAT = 'YYYY-MM-DD';

  constructor(private router: Router, private timetableService: TimeTableService) {}

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') === null) {
      return this.router.navigate(['credentials']);
    }

    this.setDates();
    this.setCurrentDate();

    this.timetableService.getTimeTable(localStorage.getItem('icc_campapp_username'), localStorage.getItem('icc_campapp_password'))
      .map((result) => {
        const timetable = result.timetable.filter(timetableItem => timetableItem.type === 'workshop');
        result.timetable = timetable;
        return result;
      })
      .subscribe((result) => {
        this.data = result;
        this.setCurrentActivities();
      }, (error) => {
        return this.router.navigate(['credentials']);
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

  private setDates() {
    const date = this.createMoment(this.FIRST_DAY);

    for (let i = 1; i <= this.NR_OF_DAYS; i++) {
      this.dates.push(this.createMoment(date.format(this.DATE_FORMAT)));
      date.add(1, 'day');
    }
  }

  private setCurrentDate() {
    const now = moment();
    if (now.isSameOrBefore(this.dates[0], 'day')) {
      this.currentDate = this.createMoment(this.dates[0].format(this.DATE_FORMAT));
    } else if (now.isSameOrAfter(this.dates[this.dates.length - 1], 'day')) {
      this.currentDate = this.createMoment(this.dates[this.dates.length - 1].format(this.DATE_FORMAT));
    } else {
      this.currentDate = now;
    }

    // go to next day after 17:00
    if (now.hours() >= 17 && now.isBefore(this.dates[this.dates.length - 1], 'day')) {
      this.currentDate.add(1, 'day');
    }
  }

  private setCurrentActivities() {
    const date = this.currentDate.format()
    this.currentActivities = this.data.timetable.filter(tte => tte.date.format() === date);
  }

  private createMoment(date) {
    return moment(date, this.DATE_FORMAT);
  }
}
