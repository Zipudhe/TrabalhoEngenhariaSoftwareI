import { GerenciadorLivros } from './GerenciadorLivros'
import { GerenciadorUsuarios } from './GerenciadorUsuarios'
import { Livro } from './Livro'
import { Usuario } from './Usuario'

export class Biblioteca {
  private static instancia?: Biblioteca = undefined;
  gerenciadorLivro: GerenciadorLivros = new GerenciadorLivros() // retirar esse 
  gerenciadorUsuarios: GerenciadorUsuarios = new GerenciadorUsuarios() // retirar esse 
  livros: Livro[] = []
  usuarios: Usuario[] = []

  private constructor() {
    this.livros = this.gerenciadorLivro.obterLivros()
    this.usuarios = this.gerenciadorUsuarios.obterUsuarios()
  }

  public static obterInstancia() {
    if(!Biblioteca.instancia) {
      this.instancia = new Biblioteca()
    }

    return this.instancia
  }
}