import { Component, OnInit } from '@angular/core';
import { Comments } from '../model/comments';
import { DetalheService } from './detalhe.service';

@Component({
  selector: 'app-detalhe-do-filme',
  templateUrl: './detalhe-do-filme.component.html',
  styleUrls: ['./detalhe-do-filme.component.css']
})
export class DetalheDoFilmeComponent implements OnInit {

  comments: Comments[]=[];

  constructor(private detalheService: DetalheService) { }

  ngOnInit(): void {
    //GET COMENTARIOS
    this.detalheService.getCommentsAtualizados().subscribe(comments =>{
      this.comments = comments;
    });
    this.detalheService.getComments(1);
  }

  comentario: string = '';
  publicarComentario(comentario: any){
    console.log(comentario);
  }

}
