import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { Pais } from 'src/app/model/pais';
import { Subject } from 'rxjs';
import { Genero } from 'src/app/model/genero';
import { Filme } from 'src/app/model/filme';

@Injectable({
  providedIn: 'root'
})

export class EditarFilmeService{


  private resposta: any;
  private filme =  new Filme();
  private colecaoPaises = new Subject<Pais[]>();
  private colecaoGeneros = new Subject<Genero[]>();
  private alterado: any;

  constructor(private httpClient: HttpClient) { }



  public async atualizar(filme: any){
    this.alterado = await this.httpClient.put( 'http://localhost:3000/editar-filme', filme).toPromise()
    .catch((erro) => console.log(erro));

    this.alterado = this.alterado.resposta.affectedRows;
    return this.alterado;
  }

  public add(filme: Filme){
    return this.httpClient.post<{filmes: Filme[]}>('http://localhost:3000/filmes', filme).subscribe(response=>{
      console.log(response);
    });
  }

  public upload(files: Set<File>){
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    return this.httpClient.post('http://localhost:3000/editar-filme-comImg', formData);
  }

  //DELETAR FILME
  public deletar(filme: Filme){
    let req = new HttpRequest('DELETE', 'http://localhost:3000/filmes');
    let newReq = req.clone({body: filme});
    this.httpClient.request(newReq).subscribe (resultado =>{
      console.log(resultado);
    });
  }



  public buscarFilme(id:any){
    return this.httpClient.get<{filmes: Filme[]}>('http://localhost:3000/editar-filme/' + id);
    //return this.httpClient.get('http://localhost:3000/editar-filme/' + id, {responseType:'json'})/* .subscribe(data =>console.log(data)) */;
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



  //GETs DE PAIS E GENERO PARA UPDATE DE FILMES
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


}
