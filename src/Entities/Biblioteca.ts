import BancoDeDados, { IBancoDeDadosLivro, IBancoDeDadosUsuario } from '../BancoDeDados';
import { AlunoGraduacao } from './AlunoGraduacao';
import { AlunoPosGraduacao } from './AlunoPosGraduacao';
import { Exemplar } from './Exemplar';
import { Livro } from './Livro'
import { OutputHandler } from './OutputHandler';
import { Professor } from './Professor';
import { Usuario } from './Usuario'
import { ValidadorAluno } from './ValidadorAluno';
import { ValidadorProfessor } from './ValidadorProfessor';

export class Biblioteca {
  private static instancia: Biblioteca;
  livros: Livro[] = []
  usuarios: Usuario[] = []

  private constructor() {
    this.livros = this.obterLivros()
    this.usuarios = this.obterUsuarios()
  }

  public static obterInstancia(): Biblioteca {
    if(!Biblioteca.instancia) {
      this.instancia = new Biblioteca()
    }

    return this.instancia
  }

  private obterLivros(): Livro[] {
    const database = BancoDeDados.getInstance()
    const livros = database.getLivros()
      .map((databaseLivro: IBancoDeDadosLivro) => {
        
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

  private obterUsuarios(): Usuario[] {
    const database = BancoDeDados.getInstance()

    const databaseUsers = database.getUsuarios()
    
    const usuarios = databaseUsers.map((databaseUser: IBancoDeDadosUsuario) => {
      switch(databaseUser.tipo_usuario) {
        case 'AlunoGraduacao':
          return new AlunoGraduacao(databaseUser.codigo, databaseUser.nome, 3, new ValidadorAluno())
        case 'AlunoPosGraduacao':
          return new AlunoPosGraduacao(databaseUser.codigo, databaseUser.nome, 4 , new ValidadorAluno())
        case 'Professor':
          return new Professor(databaseUser.codigo, databaseUser.nome, Number.MAX_VALUE, new ValidadorProfessor())
      }
    })
    
    return usuarios
  }

  public consultarLivro(codLivro: number): Livro | undefined {
    const livro = this.livros.find((livro) => livro.getCodigo() == codLivro)
    return livro
  }

  public consultarUsuario(codUsuario: number): Usuario | undefined {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)
    return usuario
  }

  public emprestarLivro(codLivro: number, codUsuario: number): void {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)
    const livro = this.livros.find((livro) => livro.getCodigo() == codLivro)
    
    if(!usuario) {
      OutputHandler.ErrorOutput('Usuário inválido')
      return
    }

    if(!livro) {
      OutputHandler.ErrorOutput('Livro inválido')
      return
    }
    
    usuario.emprestarLivro(livro)
  }

  public devolverLivro(codUsuario: number, codLivro: number): void {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)
    const livro = this.livros.find((livro) => livro.getCodigo() == codLivro)

    if(!usuario) {
      OutputHandler.ErrorOutput('Usuário inválido')
      return
    }

    if(!livro) {
      OutputHandler.ErrorOutput('Livro inválido')
      return
    }

    usuario.devolverLivro(livro)

    OutputHandler.devolucaoInfo(usuario, livro)
  }

  public reservarLivro(codUsuario: number, codLivro: number): void {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)

    const livro = this.livros.find((livro) => livro.getCodigo() == codLivro)

    if(!usuario) {
      OutputHandler.ErrorOutput('Usuário inválido')
      return
    }

    if(!livro) {
      OutputHandler.ErrorOutput('Livro inválido')
      return
    }

    usuario.reservarLivro(livro)
  }
}