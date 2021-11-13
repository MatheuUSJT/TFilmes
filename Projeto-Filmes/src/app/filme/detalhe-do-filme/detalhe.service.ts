import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Comments } from '../../model/comments';
import { Filme } from 'src/app/model/filme';

@Injectable({
  providedIn: 'root'
})

export class DetalheService {
  private resposta: any;
  private filme =  new Filme();
  colecaoComments = new Subject<Comments[]>();

  constructor(private httpClient: HttpClient) { }


  public buscarFilme(id:any){
    return this.httpClient.get('http://localhost:3000/comments/filme/' + id, {responseType:'json'})/* .subscribe(data =>console.log(data)) */;
  }

  public async getFilme(id:any){
    this.resposta = await this.buscarFilme(id).toPromise().catch((erro) => console.log(erro));
    this.setFilme(this.resposta.filme[0]);
  }


  public setFilme(resposta: any){
    this.filme.id_filme = resposta.id_filme;
    this.filme.titulo = resposta.titulo;
    this.filme.data_lancamento = resposta.data_lancamento;
    this.filme.sinopse = resposta.sinopse;
    this.filme.origem_uf = resposta.origem_uf;
    this.filme.show_pais = resposta.show_pais;
    this.filme.genero = resposta.genero;
    this.filme.show_genero = resposta.show_genero;
    this.filme.imagem = resposta.imagem;
    this.filme.direcao = resposta.direcao;
    this.filme.roteiro = resposta.roteiro;
    this.filme.titulo_original = resposta.titulo_original;
    this.filme.elenco = resposta.elenco;
    this.filme.duracao = resposta.duracao;
    this.filme.trailer = resposta.trailer;
    this.filme.ativo = resposta.ativo;
  }

  public returnFilme(){
    return this.filme;
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
