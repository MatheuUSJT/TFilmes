import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeService } from '../filme/filme.service';
import { Filme } from '../model/filme';
import { Genero } from '../model/genero';
import { Pais } from '../model/pais';

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.css']
})
export class CadastroFilmeComponent implements OnInit {

  filmes: Filme[] = [];
  paises: Pais[] = [];
  paisSelecionado: number = 0;
  generos: Genero[] = [];
  generoSelecionado: number = 0;

  constructor(private filmeService: FilmeService, private router: Router) { }

  ngOnInit(): void {
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

  //UPLOAD DA IMG DO FILME {CONSTRUIR}
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

  //CADASTRA O FILME
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



}
