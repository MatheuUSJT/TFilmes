import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {


  constructor(private httpClient: HttpClient, private router: Router) {}

  public cadastrarUsuario(usuario: Usuario){
    this.httpClient.post<{usuario: Usuario[]}>("http://localhost:3000/cadastro-usuario", usuario)
    .subscribe(resultado=>{console.log(resultado)});
  }


}
