import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  log: any;

  constructor(private httpClient: HttpClient) {}


  id_recebido: any;

  public buscarLogin(login: Login){
     return this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:"text"} )
    .pipe();
  }
/*
  public buscarLogin(login: Login) {
    return this.httpClient.get(this.id_recebido, {responseType: 'text'})
    .pipe(
      data => this.log(this.id_recebido, data),
    )
  } */

  public retornarId(){
    return this.id_recebido;
  }

  public validarSenha(email: string){

  }

}

interface Id_usuario {
  id_usuario: any;
}
