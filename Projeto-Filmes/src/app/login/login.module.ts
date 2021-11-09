import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";
import { CadastroUsuarioComponent } from "./cadastro-usuario/cadastro-usuario.component";

import { HttpClientModule } from "@angular/common/http";
import { CardModule } from "primeng/card";
import { FormsModule } from "@angular/forms";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from 'primeng/dropdown';




@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TabViewModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule
  ],
  exports:[],
  declarations:[
    LoginComponent,
    CadastroUsuarioComponent
  ],
  providers:[LoginService],
})

export class LoginModule{}
