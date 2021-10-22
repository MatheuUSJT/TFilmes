import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FilmeComponent } from './filme/filme.component';
import { DetalheDoFilmeComponent } from './detalhe-do-filme/detalhe-do-filme.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'detalhe-do-filme', component: DetalheDoFilmeComponent },
  { path:'filme', component: FilmeComponent },
  { path:'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    FilmeComponent,
    DetalheDoFilmeComponent,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    InputTextareaModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
