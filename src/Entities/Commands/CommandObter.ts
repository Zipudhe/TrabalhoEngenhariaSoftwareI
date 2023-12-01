import { CommandProps, ICommand } from "../../interfaces/ICommand"
import { Biblioteca } from '../Biblioteca'

type executeInput = {
  idLivro: string,
  idUsuario: string
}
export class CommandObter implements ICommand {
  public execute([ codLivro, codUsuario ]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    
  }
}