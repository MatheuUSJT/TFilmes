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


  url:string = ""
  onselectFile(e:any){
      if(e.target.files){
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.url = event.target.result;
        }
      }
  }



  adicionar(filmeForm: any){
    const f: Filme = {
      titulo: filmeForm.value.titulo,
      data_lancamento: filmeForm.value.data_lancamento,
      origem_uf: filmeForm.value.origem_uf,
      sinopse: filmeForm.value.sinopse,
      genero: filmeForm.value.genero,
      }
    this.filmeService.add(f);
    filmeForm.resetForm();
  }

  excluir(filme: Filme){
    this.filmeService.delete(filme);
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

  atualizar (editFilmeForm: any, filme: Filme){
    var f = new Filme;
    /*const f: Filme = {
      titulo: editFilmeForm.value.titulo,
    }
    this.filmeService.update();*/
    //AQUI  this.tarefaService.update(tarefa);

    if(editFilmeForm.value.titulo === ''){f.titulo = filme.titulo;console.log("está nulo");}

    if(editFilmeForm.value.data_lancamento === '')
    {f.data_lancamento = filme.data_lancamento;}
      else{f.data_lancamento = editFilmeForm.value.data_lancamento;}


    console.log(filme.id_filme + " - " + f.titulo);
  }

  verDetalhes() {
    this.router.navigate(['/detalhe-do-filme']);
}

}
