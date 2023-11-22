import { ICommand } from "../../interfaces/ICommand"

export class CommandReservar implements ICommand {
  public execute(): void {
    throw new Error("Method not implemented.");
  }
}