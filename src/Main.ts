import figlet from 'figlet';
import PromptSync from "prompt-sync"

import { ICommand, CommandProps } from './interfaces/ICommand'

import { CommandDevolver } from "./Entities/Commands/CommandDevolver"
import { CommandEmprestarLivro } from "./Entities/Commands/CommandEmprestar"
import { CommandReservar } from "./Entities/Commands/CommandReservar"
import { CommandConsulta } from "./Entities/Commands/CommandConsulta"
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
    this.commands.set('liv', new CommandConsulta())
  }

  public run() {
      this.shouldRun = true
      OutputHandler.NormalOutput(figlet.textSync("Eng. Software 1"));
      
      while(this.shouldRun) {
        const input = this.prompt('digite o comando: ').split(' ')
        const [usrCommand, ...args] = input

        const parsedArgs = args.map(arg => Number.parseInt(arg))

        this.executarComando(usrCommand, parsedArgs)
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