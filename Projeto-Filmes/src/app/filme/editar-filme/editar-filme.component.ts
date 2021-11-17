import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  filmeBack: any;
  filme = new Filme();
  paises: Pais[] = [];
  generos: Genero[] = [];

  display: boolean = false;
  msgDisplay: any;

  constructor(private route: ActivatedRoute, private editarService: EditarFilmeService,
    private router: Router){
    this.id_filme = this.route.snapshot.params['id_filme'];
  }

  async ngOnInit(): Promise<void> {
    //GET INFOS FILME
    this.editarService.getFilme(this.id_filme)
    this.filme = this.editarService.returnFilme();

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
  async atualizar (editFilmeForm: any, filme: Filme){
    var f = new Filme;

    f.id_filme = filme.id_filme;

    if(editFilmeForm.value.titulo === '')
    {f.titulo = this.filme.titulo;}
      else{f.titulo = editFilmeForm.value.titulo};

    if(editFilmeForm.value.data_lancamento === '')
    {f.data_lancamento = filme.data_lancamento;}
      else{f.data_lancamento = editFilmeForm.value.data_lancamento;};

    if(editFilmeForm.value.sinopse === '')
    {f.sinopse = filme.sinopse;}
      else{f.sinopse = editFilmeForm.value.sinopse;};

    if(editFilmeForm.value.direcao === '')
    {f.direcao = filme.direcao;}
      else{f.direcao = editFilmeForm.value.direcao;}

    if(editFilmeForm.value.roteiro === '')
    {f.roteiro = filme.roteiro;}
      else{f.roteiro = editFilmeForm.value.roteiro;}

    if(editFilmeForm.value.elenco === '')
    {f.elenco = filme.elenco;}
      else{f.elenco = editFilmeForm.value.elenco;}

    if(editFilmeForm.value.duracao === '')
    {f.duracao = filme.duracao;}
      else{f.duracao = editFilmeForm.value.duracao;}

    if(editFilmeForm.value.trailer === '')
    {f.trailer = filme.trailer;}
      else{f.trailer = editFilmeForm.value.trailer;}

    if(editFilmeForm.value.titulo_original === '')
    {f.titulo_original = filme.titulo_original;}
      else{f.titulo_original = editFilmeForm.value.titulo_original;}

    if(editFilmeForm.value.origem_uf === '')
    {f.origem_uf = filme.origem_uf;}
      else{f.origem_uf = editFilmeForm.value.origem_uf;};

    if(editFilmeForm.value.genero === '')
    {f.genero = filme.genero;}
      else{f.genero = editFilmeForm.value.genero;};

    var aux = await this.editarService.atualizar(f);

    if(aux > 0){
      this.display = true;
      this.msgDisplay = 'Filme atualizado.';
    }else{
      this.display = true;
      this.msgDisplay = 'Erro ao atualizar, tente novamente.'
    }



  }//CLOSE ATUALIZAR


  excluir(filme: Filme){
    this.editarService.deletar(filme);
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

  ok(){
    if(this.msgDisplay == 'Filme atualizado.'){
      this.display = false;
      this.router.navigate(['/']);
    }else{
      this.display = false;
    }
  }

}
