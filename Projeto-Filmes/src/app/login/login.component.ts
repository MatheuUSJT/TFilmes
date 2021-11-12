import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  private usuarioAutenticado: number = 0;

  display: boolean = false;
  msgDisplay: any;



  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  async realizarLogin(){
    var resposta;
    resposta = await this.loginService.realizarLogin(this.login);

    if(resposta != true){
      this.display = true;
      this.msgDisplay = resposta;
    }else{
      this.loginService.navegar();
    }
  }

  ok(){this.display = false;}


  cadastrarUsuario(){
    this.router.navigate(['/cadastro-usuario'])
  }



}

