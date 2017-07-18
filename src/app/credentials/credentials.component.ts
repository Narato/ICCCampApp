import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

import { TimeTableService } from '../time-table.service';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  username = '';
  password = '';
  validationMessage = '';

  constructor(private router: Router, private timeTableService: TimeTableService) { }

  ngOnInit() {
    this.username = localStorage.getItem('icc_campapp_username');
    this.password = localStorage.getItem('icc_campapp_password');
  }

  saveCredentials(): void {
    this.timeTableService.getTimeTable(this.username, this.password)
      .subscribe((result) => {
        if (result.timetable && result.timetable.length > 0) {
          localStorage.setItem('icc_campapp_username', this.username);
          localStorage.setItem('icc_campapp_password', this.password);
          this.router.navigate(['/']);
        } else {
          this.validationMessage = 'The combination of your username and password are not correct. Please try again.';
        }
      }, (error) => {
        this.validationMessage = 'The combination of your username and password are not correct. Please try again.';
      });
  }
}
