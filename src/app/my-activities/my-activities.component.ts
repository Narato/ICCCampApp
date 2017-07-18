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
  datesWithActivities: any;
  currentDate: Moment;
  showOnlyToday = true;
  currentActivityDateIndex: number;

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
        this.saveActivitiesPerDate();
      });
  }

  selectDayBefore() {
    if (this.currentActivityDateIndex > 0) {
      this.currentActivityDateIndex--;
      this.currentDate = this.dates[this.currentActivityDateIndex];
    }
  }

  selectDayAfter() {
    if (this.currentActivityDateIndex < this.dates.length - 1) {
      this.currentActivityDateIndex++;
      this.currentDate = this.dates[this.currentActivityDateIndex];
    }
  }

  showTodaysActivities() {
    this.showOnlyToday = true;
  }

  showAllActivities() {
    this.showOnlyToday = false;
  }

  createDate(date: string) {
    return moment(date, this.DATE_FORMAT);
  }

  formatDate(date: Moment) {
    return date.format(this.DATE_FORMAT);
  }

  private setDates() {
    const date = this.createDate(this.FIRST_DAY);

    for (let i = 1; i <= this.NR_OF_DAYS; i++) {
      this.dates.push(moment(date));
      date.add(1, 'day');
    }
  }

  private setCurrentDate() {
    const now = moment();
    if (now.isBefore(this.dates[0], 'day')) {
      this.currentDate = this.dates[0];
      this.currentActivityDateIndex = 0;
    } else if (now.isSameOrAfter(this.dates[this.dates.length - 1], 'day')) {
      this.currentDate = this.dates[this.dates.length - 1];
      this.currentActivityDateIndex = this.dates.length - 1;
    } else {
      // go to next day after 17:00
      if (now.hours() >= 17) {
        now.add(1, 'day');
      }
      this.currentDate = now;
      this.currentActivityDateIndex = this.dates.map(date => this.formatDate(date)).indexOf(this.formatDate(now));
    }
  }

  private saveActivitiesPerDate() {
    this.datesWithActivities = {};
    this.dates.forEach(date => {
      const dateStr = this.formatDate(date);
      this.datesWithActivities[dateStr] = this.data.timetable.filter(tte => this.formatDate(tte.date) === dateStr);
    });
  }
}
