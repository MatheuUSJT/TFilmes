import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginComponent } from "./login.component";
import { LoginService } from "./login.service";

import { HttpClientModule } from "@angular/common/http";
import { CardModule } from "primeng/card";
import { FormsModule } from "@angular/forms";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";



@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TabViewModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  exports:[],
  declarations:[LoginComponent],
  providers:[LoginService],
})

export class LoginModule{}
