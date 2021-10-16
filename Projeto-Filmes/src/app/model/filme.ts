export class Filme {
  id_filme?: number;
  titulo!: string;
  data_lancamento?: Date;
  origem_uf!: number;
  sinopse!: string;
  qualificacao?: any;
  genero!: number;
  update_usuario?: number;
  update_data_hora?: Date;
  imagem?: string;

  //show
  pais_origem?: string;
  show_genero?: string;

}
