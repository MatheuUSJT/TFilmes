import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from '../model/filme';
import { Genero } from '../model/genero';
import { Pais } from '../model/pais';
import { FilmeService } from './filme.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

  constructor(private filmeService: FilmeService, private router: Router){}

  filmes: Filme[] = [];
  paises: Pais[] = [];
  paisSelecionado: number = 0;
  generos: Genero[] = [];
  generoSelecionado: number = 0;

  ngOnInit(){
    //GET PARA EXIBIÇÃO DE FILMES
    //GET FILMES
    this.filmeService.getColecaoAtualizada().subscribe(filmes =>{
      this.filmes = filmes;
    });
    this.filmeService.list();

    //GETS PARA CADASTRO DE FILME
    //GET PAISES
    this.filmeService.returnPaises().subscribe(paises =>{
      this.paises= paises;
    });
    this.filmeService.getPaises();

    //GET GENEROS
    this.filmeService.returnGeneros().subscribe(generos =>{
      this.generos = generos;
    });
    this.filmeService.getGeneros();
  }

  excluir(filme: Filme){
    this.filmeService.delete(filme);
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

  atualizar (editFilmeForm: any, filme: Filme){
    var f = new Filme;

    f.id_filme = filme.id_filme;

    if(editFilmeForm.value.titulo === '')
    {f.titulo = filme.titulo;}
      else{f.titulo = editFilmeForm.value.titulo};

    if(editFilmeForm.value.data_lancamento === '')
    {f.data_lancamento = filme.data_lancamento;}
      else{f.data_lancamento = editFilmeForm.value.data_lancamento;};

    if(editFilmeForm.value.origem_uf === '')
    {f.origem_uf = filme.origem_uf;}
      else{f.origem_uf = editFilmeForm.value.origem_uf;};

    if(editFilmeForm.value.sinopse === '')
    {f.sinopse = filme.sinopse;}
      else{f.sinopse = editFilmeForm.value.sinopse;};

    if(editFilmeForm.value.genero === '')
    {f.genero = filme.genero;}
      else{f.genero = editFilmeForm.value.genero;};

    this.filmeService.update(f);
    console.log(f);
  }//CLOSE ATUALIZAR

}
