import { Injectable } from '@angular/core';
import { MyPreset } from '../../mypreset';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora'
/* servizio */

interface Theme {
    label: string;
    value: {
        primaryColor: string; 
        backgroundColor: string;
        textColor?: string;
    };
    custom: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  actualTheme: object = Aura;
  themes = [
        { label: 'Aura', value: Aura, custom: false }, 
        { label: 'Lara', value: Lara, custom: false }, 
        { label: 'Material', value: Material, custom: false }, 
        { label: 'Nora', value: Nora, custom: false },
        { label: 'MyPreset', value: MyPreset, custom: true }
    ];

  //   async changeTheme(preset: object) {
  //     try {
  //       await usePreset(preset);
  //       this.actualTheme = preset;
  //     } catch (err) {
  //       console.error('Errore nel cambio preset:', err);
  //     }
  // }

    async changeTheme(preset: Theme) {
      try {
          if (preset.custom) {
            console.log("dentro if(preset.custom)...");
            this.applyCustomTheme(preset.value);
          } else {
            await usePreset(preset);
          }
          this.actualTheme = preset;
        } catch (err) {
          console.error('Errore nel cambio preset:', err);
        }
    }

    applyCustomTheme(theme: Theme['value']) {
      if (!theme) return;
      console.log(this.actualTheme);
      document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
      document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
      document.documentElement.style.setProperty('--text-color', theme.textColor || '#000');
  }
}