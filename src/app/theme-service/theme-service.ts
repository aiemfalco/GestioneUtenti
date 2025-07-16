import { Injectable } from '@angular/core';
import { MyPreset } from '../../mypreset';
import { usePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora'
import { SelectModule } from 'primeng/select'
/* servizio */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  actualTheme: object = Aura;
  themes = [
        { label: 'Aura', value: Aura }, 
        { label: 'Lara', value: Lara }, 
        { label: 'Material', value: Material }, 
        { label: 'Nora', value: Nora },
        { label: 'MyPreset', value: MyPreset}
    ];

    async changeTheme(preset: object) {
      try {
        await usePreset(preset);
        this.actualTheme = preset;
      } catch (err) {
        console.error('Errore nel cambio preset:', err);
      }
  }

}
