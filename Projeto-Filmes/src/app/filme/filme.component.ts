import { Component, OnInit } from '@angular/core';
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

  constructor(private filmeService: FilmeService) { }

  filmes: Filme[] = [];
  paises: Pais[] = [];
  paisSelecionado: number = 0;
  generos: Genero[] = [];
  generoSelecionado: number = 0;

  ngOnInit(){
    //GET PARA EXIBIÇÃO DE FILMES
    //get Filmes
    this.filmeService.getColecaoAtualizada().subscribe(filmes =>{
      this.filmes = filmes;
    });
    this.filmeService.list();


    //GETS PARA CADASTRO DE FILME
    //get Paises
    this.filmeService.returnPaises().subscribe(paises =>{
      this.paises= paises;
    });
    this.filmeService.getPaises();

    //get generos
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
    //const newId = this.tarefas.length + 1;

    const f: Filme = {

      titulo: filmeForm.value.titulo,
      data_lancamento: filmeForm.value.data_lancamento,
      origem_uf: filmeForm.value.origem_uf,
      sinopse: filmeForm.value.sinopse,
      genero: filmeForm.value.genero,
      }

    console.log(f);
    this.filmeService.add(f);
    filmeForm.resetForm();
  }

  atualizar (filme: Filme){
    this.filmeService.update(filme);
    //AQUI  this.tarefaService.update(tarefa);
  }

  excluir(filme: Filme){
    this.filmeService.delete(filme);
    //AQUI  this.tarefaService.delete(tarefa);
    console.log('sim excluindo');
  }

}
