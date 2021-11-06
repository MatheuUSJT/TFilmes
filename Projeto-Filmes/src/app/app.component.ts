import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  logado?: boolean = true;
  usuario: Usuario = new Usuario();

  constructor(private loginService: LoginService) {}

  ngOnInit(){
    this.loginService.logado.subscribe(resultado=> {
      this.logado = resultado
      if(this.logado == false){
        this.usuario = this.loginService.getUsuario();
        console.log(this.usuario);
      }
    });



  }

}
