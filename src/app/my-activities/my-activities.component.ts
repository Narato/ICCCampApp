import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { TimeTableService } from '../time-table.service';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  data: any;

  constructor(private router: Router,
    private timetableService: TimeTableService) { }

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') == null) {
      this.router.navigate(['credentials']);
    }

    this.timetableService.getTimeTable(localStorage.getItem('icc_campapp_username'),localStorage.getItem('icc_campapp_password'))
    .subscribe((result) => {
      this.data = result;
      console.log(result);
    })
  }

}
