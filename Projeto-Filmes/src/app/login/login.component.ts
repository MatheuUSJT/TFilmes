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

  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  realizarLogin(formLogin: any){
    console.log("realizando login");
    const l: Login ={
      email: formLogin.value.email,
      senha: formLogin.value.senha
    }
    var resposta: any;
    this.loginService.buscarLogin(l);
    resposta = this.loginService.retornarId();
    console.log(resposta);
  }

}

interface Id_usuario {
  id_usuario: number;
}
