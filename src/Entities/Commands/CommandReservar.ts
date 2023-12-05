import { CommandProps, ICommand } from "../../interfaces/ICommand"
import { Biblioteca } from "../Biblioteca"
import { OutputHandler } from "../OutputHandler"

export class CommandReservar implements ICommand {
  public execute([ codUsuario, codLivro ]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    biblioteca.reservarLivro(codLivro, codUsuario)
  }
}