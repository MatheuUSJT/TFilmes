import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Filme } from '../model/filme';
import { Pais } from '../model/pais';
import { Genero } from '../model/genero';
import { Comments } from '../model/comments';

@Injectable({
  providedIn: 'root'
})

export class FilmeService {
  private baseUrl: string = 'http://localhost:3000/filmes';
  private colecaofilmes = new Subject<Filme[]>();
  private colecaoPaises = new Subject<Pais[]>();
  private colecaoGeneros = new Subject<Genero[]>();
  private colecaoComments = new Subject<Comments[]>();

  constructor(private httpClient: HttpClient) { }

  //RETORNA COLEÇÃO ATUALIZADA DE FILMES
  public getColecaoAtualizada(){
    return this.colecaofilmes.asObservable();
  };

  //GET FILMES PARA EXEBICAO
  public list (){
    this.httpClient.get<{filmes: Filme[]}>(this.baseUrl).subscribe(resultado =>{
      this.colecaofilmes.next(resultado.filmes);
    });
  };

  //ADICIONAR FILME
  public add(filme: Filme){
      this.httpClient.post<{filmes: Filme[]}>(this.baseUrl, filme).subscribe (resultado =>{
        this.colecaofilmes.next(resultado.filmes);
      });
    }

  //CRIAR//
  //ATUALIZAR FILME
  public update(filme: Filme){
    this.httpClient.put<{filmes: Filme[]}>(this.baseUrl, filme).subscribe (resultado =>{
      this.colecaofilmes.next(resultado.filmes);
    });
  }

  //DELETAR FILME
  public delete(filme: Filme){
    let req = new HttpRequest('DELETE', this.baseUrl);
    let newReq = req.clone({body: filme});
    this.httpClient.request(newReq).subscribe (resultado =>{
      this.list();
    });
  }





  //GETs DE PAIS E GENERO PARA CADASTRO DE FILMES
  public returnPaises(){
    return this.colecaoPaises.asObservable();
  }

  public getPaises(){
    this.httpClient.get<{paises: Pais[]}>('http://localhost:3000/paises').subscribe(resultado => {
      this.colecaoPaises.next(resultado.paises);
    });
  }

  public returnGeneros(){
    return this.colecaoGeneros.asObservable();
  }

  public getGeneros(){
    this.httpClient.get<{generos: Genero[]}>('http://localhost:3000/generos').subscribe(resultado => {
      this.colecaoGeneros.next(resultado.generos);
    });
  }




  //GETS, INSERTS AND UPDATES COMMENTS
  public getComments(id:number){
    this.httpClient.get<{comments: Comments[]}>('http://localhost:3000/comments/' + id).subscribe(resultado => {
      this.colecaoComments.next(resultado.comments);
    })
  }
  //RETORNA COLEÇÃO ATUALIZADA DE COMENTARIOS
  public getCommentsAtualizados(){
    return this.colecaoComments.asObservable();
  };




//ULTIMA CHAVE
}
