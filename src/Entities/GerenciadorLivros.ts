import { Livro } from "./Livro";
import { Database, IDatabaseBook, IDatabaseExemplary } from '../database'
import { Exemplar } from "./Exemplar";

export class GerenciadorLivros {
  
  constructor(){}
  //@ts-ignore
  public obterLivros(): Livro[] {
    const database = Database.getInstance()
    const livros = database.getLivros()
      .map((databaseLivro: IDatabaseBook) => {
        
        const livro = new Livro(
          databaseLivro.codigo,
          databaseLivro.titulo,
          databaseLivro.autores,
          databaseLivro.edicao,
          databaseLivro.ano_publicacao,
          databaseLivro.editora
        )

        const exemplares = database.getExemplaresByLivro(databaseLivro.codigo)
        exemplares.forEach(databaseExemplar => {
          const exemplar = new Exemplar(
            databaseExemplar.codigo_exemplar,
            'Disponível'
          )

          livro.adicionarExemplar(exemplar)
        })

        return livro
      })

    return livros
  }
}