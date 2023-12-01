import { GerenciadorLivros } from './GerenciadorLivros'
import { GerenciadorUsuarios } from './GerenciadorUsuarios'
import { Livro } from './Livro'
import { Usuario } from './Usuario'

export class Biblioteca {
  private static instancia: Biblioteca;
  gerenciadorLivro: GerenciadorLivros = new GerenciadorLivros() // retirar esse 
  gerenciadorUsuarios: GerenciadorUsuarios = new GerenciadorUsuarios() // retirar esse 
  livros: Livro[] = []
  usuarios: Usuario[] = []

  private constructor() {
    this.livros = this.gerenciadorLivro.obterLivros()
    this.usuarios = this.gerenciadorUsuarios.obterUsuarios()
  }

  public static obterInstancia(): Biblioteca {
    if(!Biblioteca.instancia) {
      this.instancia = new Biblioteca()
    }

    return this.instancia
  }

  public consultarLivro(codLivro: number): Livro | undefined {
    const livro = this.livros.find((livro) => livro.getCodigo() == codLivro)
    return livro
  }

  public consultarUsuario(codLivro: number): Usuario | undefined {
    const usuario = this.usuarios.find((usuario) => usuario.obterCodigo() == codLivro)
    return usuario
  }
}