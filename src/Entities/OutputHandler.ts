import chalk from 'chalk'
import { Livro } from './Livro'
import { Usuario } from './Usuario'

export class OutputHandler {
  static SuccessOutput(text: string) {
    console.log(chalk.green(text))
  }

  static ErrorOutput(text: string) {
    console.log(chalk.red(text))
  }

  static NormalOutput(text: string) {
    console.log(text)
  }

  static mostrarLivroInfo(livro: Livro) {
    const exemplares = livro.obterExemplares()
    console.log('----------------------------')
    console.log(`Titulo: ${chalk.green(livro.getTitulo())}`)
    console.log('Quantidade reservas: ')
    console.log('----------------------------')
    console.log('Examplares: ')
    exemplares.forEach(exemplar => {
      console.log(`\t - Código exemplar: ${exemplar.getCodigo()}`)
      const status = exemplar.getStatus()
      console.log(`\t - Status: ${status == 'Disponível' ? chalk.green(status) : chalk.red(status)}`)
      console.log('++++++++++++++++++++++++++++')
    })
    console.log('----------------------------')
  }

  static mostrarUsuarioInfo(usuario: Usuario) {
    console.log('----------------------------')
    console.log(`Codigo: ${chalk.green(usuario.obterCodigo())}`)
    console.log(`Nome: ${chalk.green(usuario.obterNome())}`)
    console.log('----------------------------')
  }
}