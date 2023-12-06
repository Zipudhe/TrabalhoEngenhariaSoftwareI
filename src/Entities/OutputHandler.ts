import chalk from 'chalk'
import { Livro } from './Livro'
import { Usuario } from './Usuario'
import { Biblioteca } from './Biblioteca'
import { StatusEmprestimo } from './Emprestimo'
import { Exemplar } from './Exemplar'

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

  static mostrarLivroInfo(livro: Livro, exemplaresReservados: Map<Exemplar, Usuario>, exemplaresEmprestados: Map<Exemplar, Usuario>) {
    const exemplares = livro.obterExemplares()
    const qtdReservas = exemplares.filter(examplar => examplar.obterStatus() == 'Reservado').length
    const dateFormatter = Intl.DateTimeFormat('pt-BR', { 
      dateStyle: 'short'
    })
    console.log('----------------------------')
    console.log(`Titulo: ${chalk.green(livro.obterTitulo())}`)
    console.log(`Quantidade reservas: ${qtdReservas}`)
    for(let key of exemplaresReservados.keys()) {
      console.log(`${exemplaresReservados.get(key)?.obterNome()}`)
    }
    console.log('----------------------------')
    console.log('Examplares: ')
    exemplares.forEach(exemplar => {
      const usuario = exemplaresEmprestados.get(exemplar)
      console.log(`\t - Código exemplar: ${exemplar.obterCodigo()}`)
      const status = exemplar.obterStatus()
      console.log(`\t - Status: ${status == 'Disponível' ? chalk.green(status) : chalk.red(status)}`)
      if(usuario) {
        const emprestimo = usuario.obterEmprestimo(exemplar.obterCodigo())
        console.log(`\t Usuario: ${usuario.obterNome()}`)
        console.log(`\t Data Emprestimo: ${dateFormatter.format(emprestimo?.obterDataEmprestimo())}`)
        console.log(`\t Data Devolucao: ${dateFormatter.format(emprestimo?.obterDataEntrega())}`)
      }
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
      console.log(`\t - Titulo: ${chalk.green(livro?.obterTitulo())}`)
      console.log(`\t - Data Emprestimo: ${chalk.green(dateFormatter.format(emprestimo.obterDataEmprestimo()))}`)
      console.log(`\t - Data Entrega: ${chalk.green(dateFormatter.format(emprestimo.obterDataEntrega()))}`)
      console.log(`\t - Status: ${statusText}`)
    })
  }

  static devolucaoInfo(usuario: Usuario, livro: Livro) {
    console.log(`
      Livro: ${livro.obterTitulo()}
      Status: ${chalk.green('Devolvido')}
      Usuario: ${usuario.obterNome()}
    `)
  }

  static reservaStatus(nomeUsuario: string, tituloLivro: string, status: boolean ) {
    console.log(`
      Usuario: ${chalk.green(nomeUsuario)} 
      Livro: ${chalk.green(tituloLivro)}
      Reserva: ${status ? `${chalk.green('Reservado')}` : `${chalk.red('Não Reservado')}`}
    `)
  }
}