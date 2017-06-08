import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-my-leisure-activities',
  templateUrl: './my-leisure-activities.component.html',
  styleUrls: ['./my-leisure-activities.component.scss']
})
export class MyLeisureActivitiesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('icc_campapp_username') == null) {
      this.router.navigate(['credentials']);
    }
  }

}
