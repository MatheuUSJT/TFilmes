import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppComponent } from '../app.component';
import { Filme } from '../model/filme';
import { Genero } from '../model/genero';
import { Pais } from '../model/pais';
import { FilmeService } from './filme.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit, OnDestroy {

  constructor(private filmeService: FilmeService, private router: Router, private appService: AppComponent){}

  filmes: Filme[] = [];
  paises: Pais[] = [];
  paisSelecionado: number = 0;
  generos: Genero[] = [];
  generoSelecionado: number = 0;
  admGeral?: boolean = false;
  msgFiltro: String = 'Buscar por título, exemplo: O Poderoso...';
  filtro: any = 'titulo';
  filterBy: String = 'titulo';

  unsub$ = new Subject();

  ngOnInit(){

    this.admGeral = this.appService.admGeral;

    //GET PARA EXIBIÇÃO DE FILMES
    //GET FILMES
    this.filmeService.getColecaoAtualizada().pipe(take(1)).subscribe(filmes =>{
      this.filmes = filmes;
    });
    this.filmeService.list();

    //GETS PARA CADASTRO DE FILME
    //GET PAISES
    this.filmeService.returnPaises().pipe(take(1)).subscribe(paises =>{
      this.paises= paises;
    });
    this.filmeService.getPaises();

    //GET GENEROS
    this.filmeService.returnGeneros().pipe(take(1)).subscribe(generos =>{
      this.generos = generos;
    });
    this.filmeService.getGeneros();
  }

  ngOnDestroy() {

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


  verDetalheFilme(id_filme:any){
    this.router.navigate(['/detalhe-filme', id_filme]);
  }

  editarFilme(id_filme:any){
    this.router.navigate(['/editar-filme', id_filme]);
  }

  filtrar(){
    if(this.filtro == 'titulo'){
      this.filterBy = 'titulo';
      this.msgFiltro = 'Buscar por título, exemplo: O Poderoso...';
    }
    if(this.filtro == 'data_lancamento'){
      this.filterBy = 'data_lancamento';
      this.msgFiltro = 'Buscar por ano do lançamento, exemplo: 1995'
    }
    if(this.filtro == 'show_genero'){
      this.filterBy = 'show_genero';
      this.msgFiltro = 'Buscar por genero, exemplo: Ação...'
    }
    if(this.filtro == 'show_pais'){
      this.filterBy = 'show_pais';
      this.msgFiltro = 'Buscar por país que produziu, exemplo: Estados Unidos... '
    }

  }

  opcoes = [
    {rotulo: "Título", valor: 'titulo'},
    {rotulo: "Data de Lançamento", valor: 'data_lancamento'},
    {rotulo: "Genero", valor: 'show_genero'},
    {rotulo: "Produzido em", valor: 'show_pais'}
  ]

}
