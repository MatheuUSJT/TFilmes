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
  admMaster = new EventEmitter<boolean>();
  admGeral = new EventEmitter<boolean>();
  logado = new EventEmitter<boolean>();
  resposta: any;

  msgDisplay: any;


  constructor(private httpClient: HttpClient, private router: Router) {}

  public buscarLogin(login: Login){
    return this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'});
    //console.log(this.id_recebido);
   /* this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'}).pipe(take(1)).subscribe(resultado=>{
      this.id_recebido = resultado}); */
  }

  public async realizarLogin(login: Login){
    this.resposta = await this.buscarLogin(login).toPromise().catch((erro) => console.log(erro));

    if(this.resposta.usuario){
      this.setUsuario(this.resposta.usuario[0]);
      return true;
      /* if(this.usuario.id_usuario){
        this.navegar();
      }else{console.log('ID nulo.')} */
    }else{
      this.msgDisplay = this.resposta.msg;
      console.log(this.resposta);
      return this.msgDisplay;
    }
  }

  public navegar(){
    console.log(this.usuario.id_usuario);
    this.logado.emit(false);
    this.router.navigate(['/']);
  }

  public getStatusLogin(){
    return this.logado;
  }

  public setUsuario(u: Usuario){
    this.usuario.id_usuario = u.id_usuario;
    this.usuario.nome = u.nome;
    this.usuario.email = u.email;
    this.usuario.perfil = u.perfil;

    this.validaPerfil(this.usuario.perfil);
  }

  public validaPerfil(perfil: any){
    //if para cadastrar usuarios admMaster
    if(perfil === 2){
      this.admMaster.emit(true);
    }else{
      this.admMaster.emit(false);
    }

    //if para cadastrar filmes admGeral
    if(perfil === 2 || perfil === 3){
      this.admGeral.emit(true);
    }else{
      this.admGeral.emit(false);
    }
  }

  public getUsuario(){
    return this.usuario;
  }


}
