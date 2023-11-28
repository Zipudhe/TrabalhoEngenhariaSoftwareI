import figlet from 'figlet';
import PromptSync from "prompt-sync"
import { ICommand } from "./interfaces/ICommand"
import { CommandDevolver } from "./Entities/Commands/CommandDevolver"
import { CommandEmprestarLivro } from "./Entities/Commands/CommandEmprestar"
import { CommandReservar } from "./Entities/Commands/CommandReservar"
import { OutputHandler } from './Entities/OutputHandler';

console.log(figlet.textSync("Eng. Software 1"));

const prompt = PromptSync({
  sigint: true
})

let shouldRun = true
type Commands = Map<String, ICommand> 
const commands: Commands = new Map()
commands.set('emp', new CommandEmprestarLivro())
commands.set('dev', new CommandDevolver())
commands.set('res', new CommandReservar())

while(shouldRun) {
  const input = prompt('digite o comando: ').split(' ')
  const [command, codUsuario, codLivro] = input

  const toBeExecuted = commands.get(command)
  if(toBeExecuted) {
    toBeExecuted.execute()
  } else {
    OutputHandler.ErrorOutput('Comando inexistente')
  }
}