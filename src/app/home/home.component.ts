import {TimeTableService} from '../time-table.service';
import { Component, OnInit } from '@angular/core';
import { TimeTable } from "app/time-table";
import { TimeTableWrapper } from "app/time-table-wrapper";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  timeTableWrapper: TimeTableWrapper;

  constructor(timeTableService: TimeTableService) {
    timeTableService.getTimeTable("callen", "1234").subscribe(timeTableWrapper => {
      this.timeTableWrapper = timeTableWrapper;
      console.log(this.timeTableWrapper.timetable[0].description);
    });
  }

  ngOnInit() {
  }

}
