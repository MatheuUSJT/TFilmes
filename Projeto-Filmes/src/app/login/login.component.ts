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


  constructor(private loginService : LoginService, private router: Router) { }

  ngOnInit(): void {

  }

  realizarLogin(){
    console.log("realizando login");
    this.loginService.realizarLogin(this.login);
  }


  cadastrarUsuario(){
    this.router.navigate(['/cadastro-usuario'])
  }



}

