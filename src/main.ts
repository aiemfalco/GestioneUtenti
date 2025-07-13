import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

/*import { provideAnimations } from '@angular/platform-browser/animations';
import { providePreset } from 'primeng';
import { nora, lara, aura, material } from 'primeng/presets'; */


bootstrapApplication(AppComponent, appConfig);
/*
const presetName = localStorage.getItem('theme') ?? 'nora';
const presetMap: { [key: string]: any } = {
  nora,
  lara,
  aura,
  material
};

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    providePreset(presetMap[presetName])
  ]
});
*/
