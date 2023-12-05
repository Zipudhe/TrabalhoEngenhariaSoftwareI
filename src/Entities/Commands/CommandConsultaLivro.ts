import { ICommand, CommandProps } from '../../interfaces/ICommand'
import { Biblioteca } from '../Biblioteca'
import { Exemplar } from '../Exemplar'
import { OutputHandler } from '../OutputHandler'
import { Usuario } from '../Usuario'

export class CommandConsultaLivro implements ICommand {
  execute([codLivro]: CommandProps) {
    
    if(!codLivro) {
      OutputHandler.ErrorOutput('Código do livro não fornecido')
      return
    }
    const biblioteca = Biblioteca.obterInstancia()
    
    const livro = biblioteca.consultarLivro(codLivro)

    if(!livro) {
      OutputHandler.ErrorOutput('Livro não encontrado')
      return
    }

    const exemplaresReservados = new Map<Exemplar, Usuario>()
    const exemplaresEmprestados = new Map<Exemplar, Usuario>()
    const exemplares = livro.obterExemplares()
    
    for(let exemplar of exemplares) {
      if(exemplar.obterCodigoUsuario()) {
        const usuario = biblioteca.consultarUsuario(exemplar.obterCodigoUsuario())!
        if(exemplar.obterStatus() == 'Reservado') {
          exemplaresReservados.set(exemplar, usuario)
        } else {
          exemplaresEmprestados.set(exemplar, usuario)
        }
      }
    }

    OutputHandler.mostrarLivroInfo(livro, exemplaresReservados, exemplaresEmprestados)
  }
}