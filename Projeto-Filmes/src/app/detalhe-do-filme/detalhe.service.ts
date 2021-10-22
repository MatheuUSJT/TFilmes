import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Filme } from '../model/filme';
import { Comments } from '../model/comments';

@Injectable({
  providedIn: 'root'
})

export class DetalheService {
  private colecaofilmes = new Subject<Filme[]>()
  private colecaoComments = new Subject<Comments[]>();

  constructor(private httpClient: HttpClient) { }

  //GETS, INSERTS AND UPDATES COMENTARIOS
  public getComments(id:number){
    this.httpClient.get<{comments: Comments[]}>('http://localhost:3000/comments/' + id).subscribe(resultado => {
      this.colecaoComments.next(resultado.comments);
    })
  }
  //RETORNA COLEÇÃO ATUALIZADA DE COMENTARIOS
  public getCommentsAtualizados(){
    return this.colecaoComments.asObservable();
  };


}//ULTIMA CHAVE
