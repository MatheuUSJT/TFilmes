import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Filme } from '../model/filme';
import { Pais } from '../model/pais';

@Injectable({
  providedIn: 'root'
})

export class FilmeService {
  private baseUrl: string = 'http://localhost:3000/filmes';
  private colecaofilmes = new Subject<Filme[]>();
  private colecaoPaises = new Subject<Pais[]>();

  constructor(private httpClient: HttpClient) { }


  public getColecaoAtualizada(){
    return this.colecaofilmes.asObservable();
  };

  public returnPaises(){
    return this.colecaoPaises.asObservable();
  }

  public getPaises(){
    this.httpClient.get<{paises: Pais[]}>('http://localhost:3000/paises').subscribe(resultado => {
      this.colecaoPaises.next(resultado.paises);
    });
  }

  public list (){
    this.httpClient.get<{filmes: Filme[]}>(this.baseUrl).subscribe(resultado =>{
      this.colecaofilmes.next(resultado.filmes);
    });
  };

  public add(filme: Filme){
      this.httpClient.post<{filmes: Filme[]}>(this.baseUrl, filme).subscribe (resultado =>{
        this.colecaofilmes.next(resultado.filmes);
      });
    }

  public update(filme: Filme){
    this.httpClient.put<{filme: Filme[]}>(this.baseUrl, filme).subscribe (resultado =>{
      this.colecaofilmes.next(resultado.filme);
    });
  }

  public delete(filme: Filme){
    let req = new HttpRequest('DELETE', this.baseUrl);
    let newReq = req.clone({body: filme});
    this.httpClient.request(newReq).subscribe (resultado =>{
      this.list();
    });
  }


}
