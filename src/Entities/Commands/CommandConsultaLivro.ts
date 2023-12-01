import { ICommand, CommandProps } from '../../interfaces/ICommand'
import { Biblioteca } from '../Biblioteca'
import { OutputHandler } from '../OutputHandler'

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

    OutputHandler.mostrarLivroInfo(livro)
  }
}