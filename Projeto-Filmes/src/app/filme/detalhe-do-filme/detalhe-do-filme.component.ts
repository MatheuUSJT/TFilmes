import { Component, OnInit } from '@angular/core';
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
  comments: Comments[]=[];


  constructor(private detalheService: DetalheService, private loginService: LoginService){ }

  ngOnInit(): void {
    //GET COMENTARIOS
    this.detalheService.getCommentsAtualizados().subscribe(comments =>{
      this.comments = comments;
    });
    this.detalheService.getComments(1);

    this.id_usuario = this.loginService.getId_usuario();
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
