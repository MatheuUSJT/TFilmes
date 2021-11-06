import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Login } from '../model/login';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private usuario = new Usuario();
  private id_usuario?: number;
  logado = new EventEmitter<boolean>();
  resposta: any;


  constructor(private httpClient: HttpClient, private router: Router) {}

  public buscarLogin(login: Login){
    return this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'});
    //console.log(this.id_recebido);
   /* this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'}).pipe(take(1)).subscribe(resultado=>{
      this.id_recebido = resultado}); */
  }

  public async realizarLogin(login: Login){
    this.resposta = await this.buscarLogin(login).toPromise().catch((erro) => console.log(erro));

    if(this.resposta.usuario[0]){
      this.setUsuario(this.resposta.usuario[0]);
      if(this.usuario.id_usuario){
        this.navegar(this.usuario.id_usuario);
      }else{console.log('ID nulo.')}
    }else{
      console.log(this.resposta);
    }
  }

  public navegar(id: number){
    this.id_usuario = id;
    this.logado.emit(false);
    this.router.navigate(['/']);
  }

  public getId_usuario(){
    return this.id_usuario;
  }

  public getStatusLogin(){
    return this.logado;
  }

  public setUsuario(u: Usuario){
    this.usuario.id_usuario = u.id_usuario;
    this.usuario.nome = u.nome;
    this.usuario.email = u.email;
    this.usuario.perfil = u.perfil;
  }

  public getUsuario(){
    return this.usuario;
  }

}
