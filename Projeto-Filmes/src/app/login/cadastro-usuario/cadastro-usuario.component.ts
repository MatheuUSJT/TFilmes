import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { Usuario } from 'src/app/model/usuario';
import { LoginService } from '../login.service';
import { CadastroService } from './cadastro-usuario.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  perfis: Perfil[] = [];
  admMaster?: boolean = false;
  logado?: boolean = true;

  constructor(private cadastroService: CadastroService, private loginService: LoginService, private appService: AppComponent) { }

  ngOnInit(){

    this.cadastroService.returnPerfis().subscribe(perfis => {
      this.perfis = perfis;
    });
    this.cadastroService.getPerfil();


    this.admMaster = this.appService.admMaster;

    this.logado = this.appService.logado;

  }

  cadastrar(form: any){
    if(form.value.nome == '' || form.value.email =='' || form.value.senha == ''
    || form.value.confirmaSenha == ''){
      console.log('Preencha todos campos');
    }else{
      var auxPerfil;
      if(form.value.perfil == undefined || form.value.perfil == ''){
        auxPerfil = 1;
      }else{
        auxPerfil = form.value.perfil;
      }

      const u: Usuario = {
        nome: form.value.nome,
        email: form.value.email,
        senha: form.value.senha,
        perfil: auxPerfil,
      }

      if(form.value.senha != form.value.confirmaSenha){
        console.log('As senhas não são iguais!');
      }else{
        console.log(u);
        this.cadastroService.realizarCadastro(u, this.logado);
      }//CLOSE 2 ELSE
    }//CLOSE 1 ELSE

  }//CLOSE CADASTRAR

}

interface Perfil {
  codigo: number;
  descricao: string;
}
