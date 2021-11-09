import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})

export class CadastroService {

  private resposta!: any;
  private usuario = new Usuario();
  private colecaoPerfis = new Subject<Perfil[]>();

  constructor(private httpClient: HttpClient, private router: Router, private loginService: LoginService) {}

  public cadastrarUsuario(usuario: Usuario){
    return this.httpClient.post<{id: number}>("http://localhost:3000/cadastro-usuario", usuario);
  }

  public async realizarCadastro(usuario: Usuario, logado:any) {
    this.resposta = await this.cadastrarUsuario(usuario).toPromise().catch((erro) => console.log(erro));

    console.log(this.resposta.usuario[0]);

    if(logado == false){
      this.router.navigate(["/"]);

    }else{
      this.loginService.setUsuario(this.resposta.usuario[0]);
      this.usuario = this.loginService.getUsuario();

      if(this.usuario.id_usuario){
        this.loginService.navegar(this.usuario.id_usuario);
      }else{
        console.log(this.resposta);
      }
    }


  }

  public logar(){
    this.router.navigate(['/login']);
  }

  public getPerfil (){
    this.httpClient.get<{perfis: Perfil[]}>('http://localhost:3000/cadastro-usuario/perfis')
    .subscribe(resposta => {
      this.colecaoPerfis.next(resposta.perfis);
    });
  }

  public returnPerfis () {
    return this.colecaoPerfis.asObservable();
  }

}

interface Perfil{
  codigo: number;
  descricao: string;
}
