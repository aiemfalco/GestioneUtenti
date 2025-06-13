import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { ROUTES } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import lara from '@primeng/themes/lara';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(ROUTES),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: lara , options: {darkModeSelector: 'my-dark-app'}} }
    )
  ]
};
