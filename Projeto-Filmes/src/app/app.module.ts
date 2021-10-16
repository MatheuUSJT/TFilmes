import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


import { AppComponent } from './app.component';
import { FilmeComponent } from './filme/filme.component';

@NgModule({
  declarations: [
    AppComponent,
    FilmeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
