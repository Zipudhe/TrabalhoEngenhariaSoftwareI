import { ICommand, CommandProps } from "../../interfaces/ICommand"
import { Biblioteca } from "../Biblioteca"
import { OutputHandler } from "../OutputHandler"


export class CommandDevolver implements ICommand {
  public execute({ codLivro, codUsuario }: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    OutputHandler.SuccessOutput('Livro devolvido')
  }
}