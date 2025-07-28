import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ThemeService } from "./theme-service";
import { CommonModule } from "@angular/common";
import { InputTextModule } from 'primeng/inputtext';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ButtonModule } from "primeng/button";
import { Router } from "@angular/router";
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
@Component({
  selector: 'customize-theme',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ColorPickerModule, ButtonModule],
  templateUrl: './customize-theme.html',
  styleUrl: './customize-theme.css'
})
export class CustomizeTheme{

    newThemeLabel: string = '';
    newPrimaryColor: string = '';
    newBackgroundColor: string = '';
    newTextColor: string = '';
    newBackgroundButtonColor: string = '';

    constructor(private _themeService: ThemeService, private _router: Router) {}

    saveCustomTheme() {
        if (!this.newThemeLabel || !this.newPrimaryColor || !this.newBackgroundColor) {
            alert('Completa tutti i campi richiesti!');
            return;
        }

        const newTheme: Theme = {
        label: this.newThemeLabel,
        value: {
            primaryColor: this.newPrimaryColor,
            backgroundColor: this.newBackgroundColor,
            textColor: this.newTextColor,
            backgroundButtonColor: this.newBackgroundButtonColor
        },
        custom: true
    };
        // console.log("Il nuovo tema è custom: ", newTheme.custom, typeof(newTheme.custom));
        this._themeService.themes.push(newTheme);
        this.saveCustomThemesToLocalStorage();
        this._router.navigate(['/users']);
        // console.log(this._themeService.themes); 
    }

    saveCustomThemesToLocalStorage() {
        const customThemes = this._themeService.themes.filter(t => t.custom);
        localStorage.setItem('customThemes', JSON.stringify(customThemes));
    }
}