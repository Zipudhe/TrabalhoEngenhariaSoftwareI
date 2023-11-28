import { ICommand } from "../../interfaces/ICommand"
import { OutputHandler } from "../OutputHandler"

export class CommandEmprestarLivro implements ICommand {
  public execute(): void {
    OutputHandler.SuccessOutput('Livro emprestado com sucesso')
  }
}