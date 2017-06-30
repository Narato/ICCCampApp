import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TimeTableService } from '../time-table.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  data: any;
  dates: any;

  constructor(private router: Router,
    private timetableService: TimeTableService) { }

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') == null) {
      this.router.navigate(['credentials']);
    }

    this.timetableService.getTimeTable(localStorage.getItem('icc_campapp_username'),localStorage.getItem('icc_campapp_password'))
    .subscribe((result) => {
      this.data = result;
      let timetable = this.data.timetable;
      console.log(result);

      var flags = [], output = [], l = timetable.length, i;
      for( i=0; i<l; i++) {
          if( flags[timetable[i].date]) continue;
          flags[timetable[i].date] = true;
          output.push(timetable[i].date);
      }

      this.dates = output;
      console.log(this.dates);
    })
  }

}
