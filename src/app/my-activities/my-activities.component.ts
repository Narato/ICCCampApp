import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.scss']
})
export class MyActivitiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') == null) {
      this.router.navigate(['credentials']);
    }
  }

}
