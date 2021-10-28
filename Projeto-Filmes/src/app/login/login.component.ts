import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  private usuarioAutenticado: number = 0;

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  realizarLogin(){
    console.log("realizando login");
    /* const l: Login ={
      email: formLogin.value.email,
      senha: formLogin.value.senha
    } */
    var resposta: any;
    this.loginService.buscarLogin(this.login);
    resposta = this.loginService.retornarId();


    if(resposta != null){
      this.usuarioAutenticado = resposta.id;
      this.loginService.navegar(this.usuarioAutenticado);
    }else{
      console.log('informe o login e a senha');
    }

  }

}

