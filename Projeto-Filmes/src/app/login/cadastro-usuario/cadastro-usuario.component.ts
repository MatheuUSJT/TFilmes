import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { CadastroService } from './cadastro-usuario.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(private cadastroService: CadastroService) { }

  ngOnInit(): void {
  }

  cadastrar(form: any){
    if(form.value.nome == '' || form.value.email =='' || form.value.senha == ''
    || form.value.confirmaSenha == ''){
      console.log('Preencha todos campos');
    }else{
      const u: Usuario = {
        nome: form.value.nome,
        email: form.value.email,
        senha: form.value.senha}

      if(form.value.senha != form.value.confirmaSenha){
        console.log('As senhas não são iguais!');
      }else{
        this.cadastroService.realizarCadastro(u);
      }//CLOSE 2 ELSE
    }//CLOSE 1 ELSE

  }//CLOSE CADASTRAR

}
