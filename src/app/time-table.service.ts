import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TimeTable } from 'app/time-table';
import { TimeTableWrapper } from 'app/time-table-wrapper';

@Injectable()
export class TimeTableService {

  constructor(private _http: Http) { }

  getTimeTable(username: string, password: string): Observable<TimeTableWrapper> {
    const url = `http://develop.icc-camp.info/rest/timetable?id=${username}&pw=${password}`;
    return this._http.get(url)
      .map((responseData) => {

        const toMap = responseData.json();


        const wrapper = new TimeTableWrapper();
        wrapper.timetable = new Array<TimeTable>();
        toMap.timetable.forEach(timetable => {
          wrapper.timetable.push(this.mapTimeTable(timetable));
        });

        wrapper.participantFirstName = toMap.participant_first_name[0].value;
        wrapper.participantSurname = toMap.participant_surname[0].value;

        return wrapper;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  private mapTimeTable(obj: any): TimeTable {
    const timetable = new TimeTable();
    timetable.date = obj.date;
    timetable.title = obj.title;
    timetable.endTime = obj.end_time;
    timetable.description = obj.description[0].value;
    timetable.roomDescription = obj.room_description[0].value;
    timetable.roomName = obj.roomName;
    timetable.startTime = obj.start_time;
    timetable.type = obj.type;
    timetable.wsCotutor = obj.ws_cotutor;
    timetable.wsLeader = obj.ws_leader;

    return timetable;
  }
}
