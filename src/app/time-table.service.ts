import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';

import { TimeTable } from 'app/time-table';
import { TimeTableWrapper } from 'app/time-table-wrapper';
import { LoggingService } from "app/logging.service";

@Injectable()
export class TimeTableService {

  constructor(private _http: Http, private loggingService: LoggingService) { }

  getTimeTable(username: string, password: string): Observable<TimeTableWrapper> {
    const url = `http://www.icc-camp.info/rest/timetable?id=${username}&pw=${password}&timestamp=${new Date().getTime()}`;
    this.loggingService.log(url);
    return this._http.get(url)
      .map((responseData) => {

        const toMap = responseData.json();


        const wrapper = new TimeTableWrapper();
        wrapper.timetable = new Array<TimeTable>();
        toMap.timetable.forEach(timetable => {
          wrapper.timetable.push(this.mapTimeTable(timetable));
        });

        if (toMap.participant_first_name && toMap.participant_surname) {
          wrapper.participantFirstName = toMap.participant_first_name[0].value;
          wrapper.participantSurname = toMap.participant_surname[0].value;
        }

        if (toMap.staff_first_name && toMap.staff_surname) {
          wrapper.staffMemberFirstName = toMap.staff_first_name[0].value;
          wrapper.staffMemberSurname = toMap.staff_surname[0].value;
        }


        return wrapper;
      })
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    this.loggingService.log(error);
    return Promise.reject(error.message || error);
  }

  mapTimeTable(obj: any): TimeTable {
    const timetable = new TimeTable();
    timetable.date = this.mapDate(obj.date);
    timetable.title = obj.title;
    timetable.endTime = obj.end_time;
    timetable.description = obj.description[0].value;
    timetable.roomDescription = obj.room_description[0].value;
    timetable.roomName = obj.room_name;
    timetable.startTime = obj.start_time;
    timetable.type = obj.type;
    timetable.wsCotutor = obj.ws_cotutor;
    timetable.wsLeader = obj.ws_leader;
    timetable.participants = obj.participants;

    return timetable;
  }

  mapDate(dateStr: string) {
    const datePart = dateStr.toString().substring(dateStr.indexOf(',') + 2, dateStr.length);
    const day = Number(datePart.substring(0, 2));
    const month = Number(datePart.substring(3, 5));
    const year = Number(datePart.substring(6, 10));
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD');
  }
}
