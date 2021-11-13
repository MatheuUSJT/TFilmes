export class Filme {
  id_filme?: number;
  titulo!: string;
  data_lancamento?: Date;
  origem_uf!: number;
  sinopse!: string;
  genero!: number;
  imagem?: File;
  direcao!: string;
  roteiro!: string;
  titulo_original!: string
  elenco!: string;
  duracao!: string;
  trailer!: string;
  ativo?: number;


  //show
  show_pais?: string;
  show_genero?: string;

}
