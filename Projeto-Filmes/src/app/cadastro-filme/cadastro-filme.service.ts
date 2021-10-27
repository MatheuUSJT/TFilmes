import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import { Filme } from '../model/filme';
import { Pais } from '../model/pais';
import { Genero } from '../model/genero';


@Injectable({
  providedIn: 'root'
})

export class CadastroFilmeService{
  private baseUrl: string = 'http://localhost:3000/filmes';
  private colecaoPaises = new Subject<Pais[]>();
  private colecaoGeneros = new Subject<Genero[]>();

  constructor(private httpClient: HttpClient) {}

  //CADASTRAR FILME
  public add(filme: Filme){
    this.httpClient.post<{filmes: Filme[]}>(this.baseUrl, filme);
  }
  //SALVAR IMG-FILME
  public upload(files: Set<File>){
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    return this.httpClient.post('http://localhost:3000/filmes/upload', formData);
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

}
