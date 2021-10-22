import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private colecaoLogin = new Subject<Email[]>();

  email: string = '';

  public buscarLogin(email: string){
    this.httpClient.get<{logins: Email[]}>('http://localhost:3000/login/' + email).subscribe(resultado => {
      this.colecaoLogin.next(resultado.logins);
    });
  }

  public returnLogin(){
    return this.colecaoLogin.asObservable();
  }

  public validarSenha(email: string){

  }

}

interface Email{
  email: any;
}
