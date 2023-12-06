import { GerenciadorLivros } from './GerenciadorLivros'
import { GerenciadorUsuarios } from './GerenciadorUsuarios'
import { Livro } from './Livro'
import { OutputHandler } from './OutputHandler';
import { Publisher } from './Publisher';
import { Usuario } from './Usuario'

export class Biblioteca {
  private static instancia: Biblioteca;
  gerenciadorLivro: GerenciadorLivros = new GerenciadorLivros() 
  gerenciadorUsuarios: GerenciadorUsuarios = new GerenciadorUsuarios()
  EventManager: Publisher

  livros: Livro[] = []
  usuarios: Usuario[] = []

  private constructor() {
    this.livros = this.gerenciadorLivro.obterLivros()
    this.usuarios = this.gerenciadorUsuarios.obterUsuarios()
    this.EventManager = new Publisher()
  }

  public static obterInstancia(): Biblioteca {
    if(!Biblioteca.instancia) {
      this.instancia = new Biblioteca()
    }

    return this.instancia
  }

  public consultarLivro(codLivro: number): Livro | undefined {
    const livro = this.livros.find((livro) => livro.obterCodigo() == codLivro)
    return livro
  }

  public consultarUsuario(codUsuario: number): Usuario | undefined {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)
    return usuario
  }

  public emprestarLivro(codLivro: number, codUsuario: number): void {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codUsuario)
    const livro = this.livros.find((livro) => livro.obterCodigo() == codLivro)
    
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
    const livro = this.livros.find((livro) => livro.obterCodigo() == codLivro)

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

  public reservarLivro(codLivro: number, codUsuario: number): void {
    const usuario = this.consultarUsuario(codUsuario)
    const livro = this.consultarLivro(codLivro)

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