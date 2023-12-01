import { CommandProps, ICommand } from "../../interfaces/ICommand"
import { Biblioteca } from "../Biblioteca"
import { OutputHandler } from "../OutputHandler"

export class CommandEmprestarLivro implements ICommand {
  public execute([ codLivro, codUsuario ]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    OutputHandler.SuccessOutput('Livro emprestado com sucesso')
  }
}