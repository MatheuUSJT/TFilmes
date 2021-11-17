import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Youtube } from "../../pipes/youtube";

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
import { EditarFilmeComponent } from "./editar-filme/editar-filme.component";
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';





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
    DialogModule,
    DataViewModule,
    ScrollPanelModule,
    SelectButtonModule
    ],
  exports: [],
  declarations: [
    FilmeComponent,
    DetalheDoFilmeComponent,
    CadastroFilmeComponent,
    EditarFilmeComponent,
    Youtube
  ],
  providers: [
    FilmeService,
    DetalheService,
    CadastroFilmeService
  ],
})

export class FilmeModule {}
