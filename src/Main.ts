import figlet from 'figlet';
import PromptSync from "prompt-sync"

import { Biblioteca } from './Entities/Biblioteca'
import { ICommand } from './interfaces/ICommand'

import { CommandDevolver } from "./Entities/Commands/CommandDevolver"
import { CommandEmprestarLivro } from "./Entities/Commands/CommandEmprestar"
import { CommandReservar } from "./Entities/Commands/CommandReservar"
import { OutputHandler } from './Entities/OutputHandler';

type Commands = Map<String, ICommand> 

class Main {
  protected biblioteca = new Biblioteca()
  private prompt = PromptSync({ sigint: true })
  private commands: Commands = new Map()
  private shouldRun: boolean = false

  constructor(){
    this.commands.set('emp', new CommandEmprestarLivro())
    this.commands.set('dev', new CommandDevolver())
    this.commands.set('res', new CommandReservar())
  }

  public run() {
      this.shouldRun = true
      OutputHandler.NormalOutput(figlet.textSync("Eng. Software 1"));
      
      while(this.shouldRun) {
        const input = this.prompt('digite o comando: ').split(' ')
        const [usrCommand, codUsuario, codLivro] = input
      
        const command = this.commands.get(usrCommand)
        if(command) {
          command.execute()
        } else {
          OutputHandler.ErrorOutput('Comando inexistente')
        }
      }
  }
}

export default Main