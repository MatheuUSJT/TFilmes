import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
//import {Subject} from 'rxjs';
import { Login } from '../model/login';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private id_usuario?: number;
  id_recebido: any;

  constructor(private httpClient: HttpClient, private router: Router) {}

  public buscarLogin(login: Login){
    return this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'});
    //console.log(this.id_recebido);
   /* this.httpClient.get('http://localhost:3000/login/' + login.email + '/' + login.senha, {responseType:'json'}).pipe(take(1)).subscribe(resultado=>{
      this.id_recebido = resultado}); */
  }

  public async realizarLogin(login: Login){
    this.id_recebido = await this.buscarLogin(login).toPromise().catch((erro) => console.log(erro));

    if(this.id_recebido.id){
      this.navegar(this.id_recebido.id);
    }else{
      console.log(this.id_recebido);
    }
  }

  public navegar(id: number){
    this.id_usuario = id;
    this.router.navigate(['/']);
  }

  public getId_usuario(){
    return this.id_usuario;
  }


}
