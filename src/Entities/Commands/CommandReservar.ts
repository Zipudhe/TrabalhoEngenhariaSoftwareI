import { ICommand } from "../../interfaces/ICommand"
import { OutputHandler } from "../OutputHandler"

export class CommandReservar implements ICommand {
  public execute(): void {
    OutputHandler.SuccessOutput('Livro reservado com sucesso')
  }
}