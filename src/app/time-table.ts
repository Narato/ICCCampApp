import { Moment } from 'moment';

export class TimeTable {
    type: string;
    date: Moment;
    startTime: string;
    endTime: string;
    title: string;
    description: string;
    wsLeader: string;
    wsCotutor: string;
    roomName: string;
    roomDescription: string;
}
