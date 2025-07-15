import { Injectable, signal } from '@angular/core';
import { MyPreset } from '../mypreset';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

    /*
    private presetName = signal<'Nora'>;
    currentPreset = signal(MyPreset); // default theme - writable signal

    initialize() {
        const storedPreset = localStorage.getItem('theme');
        if (storedPreset) {
            this.setPreset(storedPreset);
        }
    }

    setPreset(preset: string) {
        this.presetName.set(preset);
        this.currentPreset.set(preset);
        localStorage.setItem('theme', preset);
    }
    */

}