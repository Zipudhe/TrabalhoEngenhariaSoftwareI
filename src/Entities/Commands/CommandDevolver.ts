import { ICommand } from "../../interfaces/ICommand"
import { OutputHandler } from "../OutputHandler"

export class CommandDevolver implements ICommand {
  public execute(): void {
    OutputHandler.SuccessOutput('Livro devolvido')
  }
}