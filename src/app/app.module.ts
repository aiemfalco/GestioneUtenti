// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { UserService } from './users/user.service';
import { MyAutocompleteComponent } from './my-autocomplete/my-autocomplete.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MyAutocompleteComponent
  ],
  providers: [UserService],
  bootstrap: []
})
export class AppModule { }
