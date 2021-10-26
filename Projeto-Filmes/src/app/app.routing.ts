import { ModuleWithProviders } from "@angular/compiler/src/core";
import { Routes, RouterModule } from "@angular/router";
import { CadastroFilmeComponent } from "./cadastro-filme/cadastro-filme.component";
import { DetalheDoFilmeComponent } from "./detalhe-do-filme/detalhe-do-filme.component";
import { FilmeComponent } from "./filme/filme.component";
import { LoginComponent } from "./login/login.component";

const APP_ROUTES: Routes = [
  { path: 'detalhes', component: DetalheDoFilmeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'cadastro-filme', component: CadastroFilmeComponent},
  { path: '', component: FilmeComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
