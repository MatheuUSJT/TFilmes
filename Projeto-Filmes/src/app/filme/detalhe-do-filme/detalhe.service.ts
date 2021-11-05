import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Comments } from '../../model/comments';

@Injectable({
  providedIn: 'root'
})

export class DetalheService {
  private filme: any;
  colecaoComments = new Subject<Comments[]>();

  constructor(private httpClient: HttpClient) { }


  public buscarFilme(id:any){
    return this.httpClient.get('http://localhost:3000/comments/filme/' + id, {responseType:'json'})/* .subscribe(data =>console.log(data)) */;
  }

  public async getFilme(id:any){

    this.filme = await this.buscarFilme(id).toPromise().catch((erro) => console.log(erro));

    return this.filme.filme[0];
  }


  //GETS, INSERTS AND UPDATES COMENTARIOS
  public getComments(id:any){
    this.httpClient.get<{comments: Comments[]}>('http://localhost:3000/comments/' + id).subscribe(resultado => {
      this.colecaoComments.next(resultado.comments);
    })
  }
  //RETORNA COLEÇÃO ATUALIZADA DE COMENTARIOS
  public getCommentsAtualizados(){
    return this.colecaoComments.asObservable();
  };

  public inserirComentarios(comentario: Comments){
    this.httpClient.post<{comments: Comments[]}>("http://localhost:3000/comentario/cadastrar", comentario)
    .subscribe(resultado=>{
      this.colecaoComments.next(resultado.comments);
    });
  }

}//ULTIMA CHAVE
