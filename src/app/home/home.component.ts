import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AnnouncementService } from "app/announcement.service";
import { Observable } from "rxjs/Observable";
import { Announcement } from "app/announcement";
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  announcements: Announcement[];

  constructor(public userService: UserService, private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.setAnnouncements();  
  }

  setAnnouncements(){
    this.announcementService.getAnnouncements().subscribe(announcements => {
      this.announcements = announcements;
    });
  }  
}
