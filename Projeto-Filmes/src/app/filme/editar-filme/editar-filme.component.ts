import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Filme } from 'src/app/model/filme';
import { Genero } from 'src/app/model/genero';
import { Pais } from 'src/app/model/pais';
import { EditarFilmeService } from './editar-filme.service';

@Component({
  selector: 'app-editar-filme',
  templateUrl: './editar-filme.component.html',
  styleUrls: ['./editar-filme.component.css']
})
export class EditarFilmeComponent implements OnInit {

  private id_filme: number;
  filme: any;
  paises: Pais[] = [];
  generos: Genero[] = [];

  constructor(private route: ActivatedRoute, private editarService: EditarFilmeService){
    this.id_filme = this.route.snapshot.params['id_filme'];
  }

  ngOnInit(): void {
    //GET INFOS FILME
    this.filme = this.editarService.getFilme(this.id_filme);
    console.log(this.id_filme);

    //GETS PARA UPDATE DE FILME
    //GET PAISES
    this.editarService.returnPaises().pipe(take(1)).subscribe(paises =>{
      this.paises= paises;
    });
    this.editarService.getPaises();

    //GET GENEROS
    this.editarService.returnGeneros().pipe(take(1)).subscribe(generos =>{
      this.generos = generos;
    });
    this.editarService.getGeneros();
  }

  //NÃO ESTÁ FUNCIONANDO = CORRIGIR
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

    this.editarService.atualizar(f);
    console.log(f);
  }//CLOSE ATUALIZAR


  excluir(filme: Filme){
    this.editarService.deletar(filme);
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

}
