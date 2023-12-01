import { CommandProps, ICommand } from "../../interfaces/ICommand"
import { Biblioteca } from "../Biblioteca"
import { OutputHandler } from "../OutputHandler"

export class CommandReservar implements ICommand {
  public execute([ codLivro, codUsuario ]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()

    OutputHandler.SuccessOutput('Livro reservado com sucesso')
  }
}