import { ErrorHandler } from "@angular/core";
import { AppInsights } from 'applicationinsights-js';
export class AppInsightsErrorHandler implements ErrorHandler {
  handleError(error) {      
    AppInsights.trackException(error);
    throw error;
  }
}
