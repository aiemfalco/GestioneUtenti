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
        backgroundButtonColor?: string;
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

    async changeTheme(preset: Theme) {
      console.log("preset intero:", preset);
      console.log("typeof preset.custom:", typeof preset.custom, "| valore:", preset.custom);
      try {
          if (preset.custom) { 
            console.log(preset.label, "is a custom theme");
            this.applyCustomTheme(preset.value);
          } else {
            console.log(preset.label, "is a standard theme ", preset.value);
            this.resetCustomThemeVariables(); // rimuovo le variabili css dal dom(sovrascrivono lo stile del preset )
            await usePreset(preset.value);
          }
          this.actualTheme = preset;
        } catch (err) {
          console.error('Errore nel cambio preset:', err);
        }
    }

    applyCustomTheme(theme: Theme['value']) {
      if (!theme) return;
      document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
      document.documentElement.style.setProperty('--background-color', theme.backgroundColor);
      document.documentElement.style.setProperty('--text-color', theme.textColor || '#000');
      document.documentElement.style.setProperty('--background-button-color', theme.backgroundButtonColor || '#000');
  }

    resetCustomThemeVariables() {
      const root = document.documentElement;
      root.style.removeProperty('--primary-color');
      root.style.removeProperty('--background-color');
      root.style.removeProperty('--text-color');
      root.style.removeProperty('--background-button-color');
    }
}