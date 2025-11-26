import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => {
    // Use console.error here as LoggerService is not available yet
    console.error('Failed to bootstrap application', err);
  });
