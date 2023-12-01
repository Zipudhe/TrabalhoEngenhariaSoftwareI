import { ICommand, CommandProps } from "../../interfaces/ICommand"
import { Biblioteca } from "../Biblioteca"
import { OutputHandler } from "../OutputHandler"


export class CommandDevolver implements ICommand {
  public execute([ codUsuario, codLivro]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    biblioteca.devolverLivro(codUsuario, codLivro)
  }
}