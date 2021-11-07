import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';
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
  filme: any;
  comments: Comments[]=[];


  constructor(private detalheService: DetalheService,
    private loginService: LoginService, private route: ActivatedRoute){
      this.id_filme = this.route.snapshot.params['id_filme'];}


  ngOnInit(): void {

    this.filme = this.detalheService.getFilme(this.id_filme);
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

      console.log(this.comments)

    }else{
      console.log('Faça LOGIN para poder comentar.');
    }




  }

}
