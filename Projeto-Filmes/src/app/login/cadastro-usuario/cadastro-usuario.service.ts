import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  private id_usuario!: any;

  constructor(private httpClient: HttpClient, private router: Router, private loginService: LoginService) {}

  public cadastrarUsuario(usuario: Usuario){
    return this.httpClient.post<{id: number}>("http://localhost:3000/cadastro-usuario", usuario);
  }

  public async realizarCadastro(usuario: Usuario) {
    this.id_usuario = await this.cadastrarUsuario(usuario).toPromise().catch((erro) => console.log(erro));

    if(this.id_usuario.id){
      this.navegar();
    }else{
      console.log(this.id_usuario);
    }
  }

  public getId_usuario(){
    return this.id_usuario;
  }

  public navegar(){
    this.loginService.navegar(this.id_usuario.id);
  }

  public logar(){
    this.router.navigate(['/login']);
  }

}
