import chalk from 'chalk'
import { Livro } from './Livro'
import { Usuario } from './Usuario'
import { Biblioteca } from './Biblioteca'
import { StatusEmprestimo } from './Emprestimo'

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
    const biblioteca = Biblioteca.obterInstancia()
    const emprestimos = usuario.obterEmprestimos()
    
    const dateFormatter = Intl.DateTimeFormat('pt-BR', { 
      dateStyle: 'short'
    })
    console.log('----------------------------')
    console.log(`Codigo: ${chalk.green(usuario.obterCodigo())}`)
    console.log(`Nome: ${chalk.green(usuario.obterNome())}`)
    console.log('----------------------------')
    console.log(chalk.green('Emprestimos: '))

    emprestimos.length > 0 && emprestimos.forEach(emprestimo => {
      const livro = biblioteca.consultarLivro(emprestimo.obterCodLivro())
      const statusEmprestimo = emprestimo.obteStatusEmprestimo()
      const statusText = statusEmprestimo == StatusEmprestimo.Finalizado ? chalk.green(statusEmprestimo) : chalk.red(statusEmprestimo)
      console.log('++++++++++++++++++++++++++++')
      console.log(`\t - Titulo: ${chalk.green(livro?.getTitulo())}`)
      console.log(`\t - Data Emprestimo: ${chalk.green(dateFormatter.format(emprestimo.obterDataEmprestimo()))}`)
      console.log(`\t - Data Entrega: ${chalk.green(dateFormatter.format(emprestimo.obterDataEntrega()))}`)
      console.log(`\t - Status: ${statusText}`)
    })
  }

  static devolucaoInfo(usuario: Usuario, livro: Livro) {
    console.log(`
      Livro: ${livro.getTitulo()}
      Status: ${chalk.green('Devolvido')}
      Usuario: ${usuario.obterNome()}
    `)
  }
}