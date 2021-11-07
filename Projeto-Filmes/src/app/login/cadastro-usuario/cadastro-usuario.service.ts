import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  private resposta!: any;
  private usuario = new Usuario();

  constructor(private httpClient: HttpClient, private router: Router, private loginService: LoginService) {}

  public cadastrarUsuario(usuario: Usuario){
    return this.httpClient.post<{id: number}>("http://localhost:3000/cadastro-usuario", usuario);
  }

  public async realizarCadastro(usuario: Usuario) {
    this.resposta = await this.cadastrarUsuario(usuario).toPromise().catch((erro) => console.log(erro));

    console.log(this.resposta.usuario[0]);

    this.loginService.setUsuario(this.resposta.usuario[0]);
    this.usuario = this.loginService.getUsuario();

    if(this.usuario.id_usuario){
      this.loginService.navegar(this.usuario.id_usuario);
    }else{
      console.log(this.resposta);
    }
  }

  public logar(){
    this.router.navigate(['/login']);
  }

}
