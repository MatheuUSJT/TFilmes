import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';
/* import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';

import { InputTextareaModule } from 'primeng/inputtextarea'; */


import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
/* import { FilmeComponent } from './filme/filme.component';
import { DetalheDoFilmeComponent } from './filme/detalhe-do-filme/detalhe-do-filme.component';
import { LoginComponent } from './login/login.component';
import { CadastroUsuarioComponent } from './login/cadastro-usuario/cadastro-usuario.component';
import { CadastroFilmeComponent } from './filme/cadastro-filme/cadastro-filme.component';
import { EditarFilmeComponent } from './filme/editar-filme/editar-filme.component';*/
import { LoginService } from './login/login.service';
import { FilmeModule } from './filme/filme.module';
import { LoginModule } from './login/login.module';



@NgModule({
  declarations: [
    AppComponent,
  /*EditarFilmeComponent,
    CadastroUsuarioComponent,
    LoginComponent,
    FilmeComponent,
    DetalheDoFilmeComponent,
    CadastroFilmeComponent, */
  ],
  imports: [
    routing,
    BrowserModule,
    HttpClientModule,
    FilmeModule,
    LoginModule
    /* DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    TabViewModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToggleButtonModule,
    InputTextareaModule, */
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
