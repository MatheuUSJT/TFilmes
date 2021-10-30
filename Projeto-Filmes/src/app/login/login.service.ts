import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
//import {Subject} from 'rxjs';
import { Login } from '../model/login';
import { take } from 'rxjs/internal/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private id_usuario?: number;
  id_recebido: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public buscarLogin(login: Login){
    this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'}).pipe(take(1)).subscribe(resultado=>{
      this.id_recebido = resultado})
  }

  public retornarId(){
    return this.id_recebido;
  }

  public navegar(id: number){
    this.id_usuario = id;
    this.router.navigate(['/']);
  }

  public getId_usuario(){
    return this.id_usuario;
  }


}

