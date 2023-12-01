import figlet from 'figlet';
import PromptSync from "prompt-sync"

import { ICommand, CommandProps } from './interfaces/ICommand'

import { CommandDevolver } from "./Entities/Commands/CommandDevolver"
import { CommandEmprestarLivro } from "./Entities/Commands/CommandEmprestar"
import { CommandReservar } from "./Entities/Commands/CommandReservar"
import { OutputHandler } from './Entities/OutputHandler';

type Commands = Map<String, ICommand> 

class Main {
  private prompt = PromptSync({ sigint: true })
  private commands: Commands = new Map()
  private shouldRun: boolean = false

  constructor(){
    this.initializeCommands()
  }

  private initializeCommands() {
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
      
        this.executarComando(usrCommand, { codLivro, codUsuario })
      }
  }

  private executarComando(comand: string, props: CommandProps) {
    const command = this.commands.get(comand)
    
    if(command) {
      command.execute(props)
    } else {
      OutputHandler.ErrorOutput('Comando inexistente')
    }
  }
}

export default Main