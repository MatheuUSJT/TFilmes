import { Component, OnInit } from '@angular/core';
import { Login } from '../model/login';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = new Login();
  emaildb: Email[] = [];
  email: string = '';

  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  realizarLogin(formLogin: any){
    console.log("realizando login")
    this.email = formLogin.value.email;

    var recebe;

    this.loginService.buscarLogin(this.email)
    this.loginService.returnLogin().subscribe(email=>{
      recebe = email;
    });
    console.log({recebe});

  }

}

interface Email {
  email: any;
}
