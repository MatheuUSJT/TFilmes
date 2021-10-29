import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FilmeComponent } from "./filme.component";
import { FilmeService } from "./filme.service";
import { CadastroFilmeComponent } from "./cadastro-filme/cadastro-filme.component";
import { DetalheDoFilmeComponent } from "./detalhe-do-filme/detalhe-do-filme.component";
import { DetalheService } from "./detalhe-do-filme/detalhe.service";
import { CadastroFilmeService } from "./cadastro-filme/cadastro-filme.service";

import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { ToggleButtonModule } from "primeng/togglebutton";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TabViewModule,
    CardModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    BrowserAnimationsModule,
    InputTextareaModule,
    ButtonModule,
    ToggleButtonModule,
    ],
  exports: [],
  declarations: [
    FilmeComponent,
    DetalheDoFilmeComponent,
    CadastroFilmeComponent
  ],
  providers: [
    FilmeService,
    DetalheService,
    CadastroFilmeService
  ],
})

export class FilmeModule {}
