import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmeService } from '../filme.service';
import { Filme } from '../../model/filme';
import { Genero } from '../../model/genero';
import { Pais } from '../../model/pais';
import { CadastroFilmeService } from './cadastro-filme.service';

@Component({
  selector: 'app-cadastro-filme',
  templateUrl: './cadastro-filme.component.html',
  styleUrls: ['./cadastro-filme.component.css']
})
export class CadastroFilmeComponent implements OnInit {

  private imagemFilme?: any;
  paises: Pais[] = [];
  paisSelecionado: number = 0;
  generos: Genero[] = [];
  generoSelecionado: number = 0;



  constructor(private filmeService: FilmeService, private router: Router, private cadastroService: CadastroFilmeService) { }

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


    if(this.files && this.files.size > 0 ){
      this.cadastroService.upload(this.files).subscribe(resposta=>{
        this.imagemFilme = resposta;
        console.log('UPLOAD REALIZADO')
        console.log(this.imagemFilme)
      });
    }

    filmeForm.resetForm();
  }

  //UPLOAD DA IMG DO FILME {CONSTRUIR}
  url:string = ""
  files: Set<File> = new Set();

  onChange(e:any){
      if(e.target.files){

        const selectedFiles = <FileList>e.srcElement.files;

        for(let i = 0; i < selectedFiles.length; i++){
          this.files.add(selectedFiles[i]);
        }

        /* var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload=(event:any)=>{
          this.url = event.target.result; */
        }
      }

  onUpload(){
    if(this.files && this.files.size > 0 ){
      this.cadastroService.upload(this.files).subscribe(resposta=>{
        this.imagemFilme = resposta;
        console.log('UPLOAD REALIZADO')
        console.log(this.imagemFilme)
      });
    }
  }


}
