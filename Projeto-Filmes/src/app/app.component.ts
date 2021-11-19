import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  logado?: boolean = true;
  admMaster?: boolean = false;
  admGeral?: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(){
    this.router.navigate(['/']);

    this.loginService.logado.subscribe(resultado=> {
      this.logado = resultado
      if(this.logado == false){
        this.usuario = this.loginService.getUsuario();
        console.log(this.usuario);
      }
    });

    this.loginService.admMaster.subscribe(resultado => {
      this.admMaster = resultado;
    });

    this.loginService.admGeral.subscribe(resultado => {
      this.admGeral = resultado;
    })


  }

  public sair(){
    location.reload()
  }

}
