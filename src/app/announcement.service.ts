import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Announcement } from "app/announcement";
import * as moment from 'moment';

@Injectable()
export class AnnouncementService {

    constructor(private _http: Http) { }

    getAnnouncements(): Observable<Announcement[]> {
        const contentfulurl = "https://cdn.contentful.com/spaces/gg7wnnkulxzt/entries?access_token=1d95aac77fe2a568ef8d8857fe1d3dc7eb90218fd18862869a5ddb916e2e8ea7&content_type=icc-announcement";

        return this._http.get(contentfulurl)
            .map((response) => {
                let announcementList = new Array<Announcement>();

                response.json().items.forEach(item => {
                    let announcement = new Announcement();
                    announcement.content = item.fields.content;
                    announcement.announcedAt = moment(new Date(item.sys.updatedAt));
                    announcementList.push(announcement);
                });
                return announcementList;
            })
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}