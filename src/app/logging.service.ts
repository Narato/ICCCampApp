import { Injectable } from '@angular/core';
declare var appInsights: any;
 
@Injectable()
export class LoggingService {
    private logger: any = appInsights;
     
    constructor() { }
    
    log(message: string) {
        this.logger.trackTrace(message);   
    }
    
    
}