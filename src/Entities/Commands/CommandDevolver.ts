import { ICommand } from "../../interfaces/ICommand"

export class CommandDevolver implements ICommand {
  public execute(): void {
    throw new Error("Method not implemented.");
  }
}