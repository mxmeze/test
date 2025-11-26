import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  log(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.log(`[LOG] ${message}`, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  error(message: string, error?: any): void {
    // Always log errors, but in production send to error tracking service
    console.error(`[ERROR] ${message}`, error);
    
    if (environment.production) {
      // TODO: Send to error tracking service (e.g., Sentry, LogRocket)
      // this.errorTrackingService.logError(message, error);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.debug(`[DEBUG] ${message}`, ...args);
    }
  }
}

