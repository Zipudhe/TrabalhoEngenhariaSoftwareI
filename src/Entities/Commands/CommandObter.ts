import { ICommand } from "../../interfaces/ICommand"

export class CommandObter implements ICommand {
  public execute(): void {
    throw new Error("Method not implemented.");
  }
}