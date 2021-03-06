import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Filme } from 'src/app/model/filme';
import { Usuario } from 'src/app/model/usuario';
import { Comments } from '../../model/comments';
import { DetalheService } from './detalhe.service';



@Component({
  selector: 'app-detalhe-do-filme',
  templateUrl: './detalhe-do-filme.component.html',
  styleUrls: ['./detalhe-do-filme.component.css']
})
export class DetalheDoFilmeComponent implements OnInit {


  private id_filme!: number;
  usuario = new Usuario();
  filme = new Filme();
  comments: Comments[]=[];


  display: boolean = false;
  msgDisplay: string = 'Deseja comentar?';
  confirm: string = 'Sim'


  constructor(private detalheService: DetalheService,
    private loginService: LoginService, private route: ActivatedRoute){
      this.id_filme = this.route.snapshot.params['id_filme'];
    }


  ngOnInit(): void {

    this.detalheService.getFilme(this.id_filme);
    this.filme = this.detalheService.returnFilme();
    console.log(this.filme);

    //GET COMENTARIOS
    this.detalheService.getCommentsAtualizados().subscribe(comments =>{
      this.comments = comments;
    });
    this.detalheService.getComments(this.id_filme);

    this.usuario = this.loginService.getUsuario();

    console.log('Tela de Detalhes: ' + this.id_filme);
  }

  comentario: string = '';
  publicarComentario(comentario: any){
    var aux: number = this.id_filme;
    if(this.usuario.id_usuario != null){
      const c: Comments = {
        texto: comentario,
        usuario_lan: this.usuario.id_usuario,
        filme: aux
      };

      console.log('gravar comentario');
      this.detalheService.inserirComentarios(c);

      console.log(this.comments);
      this.comentario = '';

      this.display = false;

    }else{

      this.display = false;
    }
  }

  showDialog(comentario: any) {
    this.display = true;
    if(comentario == ''){
      this.msgDisplay = 'Digite algo para comentar.';
      this.confirm = 'OK';
    }else{
      if(this.usuario.id_usuario == null){
        this.msgDisplay = 'Fa??a LOGIN para poder comentar.';
        this.confirm = 'OK';
      }
    }
  }

}
