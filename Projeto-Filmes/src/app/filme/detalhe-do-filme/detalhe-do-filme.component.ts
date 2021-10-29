import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { Comments } from '../../model/comments';
import { DetalheService } from './detalhe.service';

@Component({
  selector: 'app-detalhe-do-filme',
  templateUrl: './detalhe-do-filme.component.html',
  styleUrls: ['./detalhe-do-filme.component.css']
})
export class DetalheDoFilmeComponent implements OnInit {

  private id_usuario?: number;
  private id_filme?: number;
  comments: Comments[]=[];


  constructor(private detalheService: DetalheService,
    private loginService: LoginService, private route: ActivatedRoute){
      this.id_filme = this.route.snapshot.params['id_filme'];}


  ngOnInit(): void {
    //GET COMENTARIOS
    this.detalheService.getCommentsAtualizados().subscribe(comments =>{
      this.comments = comments;
    });
    this.detalheService.getComments(this.id_filme);

    this.id_usuario = this.loginService.getId_usuario();

    console.log('Tela de Detalhes: ' + this.id_filme);
  }

  comentario: string = '';
  publicarComentario(comentario: any){
    if(this.id_usuario != null){
      console.log('Comentário: ' + comentario);
      console.log('ID do usuário: ' + this.id_usuario);
    }else{
      console.log('Faça LOGIN para poder comentar.');
    }




  }

}
