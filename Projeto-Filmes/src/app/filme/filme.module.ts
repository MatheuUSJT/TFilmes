import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FilmeComponent } from "./filme.component";
import { FilmeService } from "./filme.service";

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [],
  declarations: [
    FilmeComponent,
  ],
  providers: [FilmeService],
})

export class FilmeModule {}
