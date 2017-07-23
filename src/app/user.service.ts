import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { TimeTableService } from './time-table.service';

@Injectable()
export class UserService {
  constructor(private timeTableService: TimeTableService) {}

  login(username: string, password: string): Observable<boolean> {
    if (this.loggedIn()) {
      return Observable.of(true);
    } else {
      return this.timeTableService.getTimeTable(username, password).map((result) => {
        if (result.participantSurname && result.participantSurname.length > 0 || result.staffMemberSurname && result.staffMemberSurname.length > 0) {
          localStorage.setItem('icc_campapp_username', username);
          localStorage.setItem('icc_campapp_password', password);
          return true;
        } else {
          return false
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('icc_campapp_username');
    localStorage.removeItem('icc_campapp_password');
  }

  loggedIn(): boolean {
    return (localStorage.getItem('icc_campapp_username') !== null) && (localStorage.getItem('icc_campapp_password') !== null);
  }
}
