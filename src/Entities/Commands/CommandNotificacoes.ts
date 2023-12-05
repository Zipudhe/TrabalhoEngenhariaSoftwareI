import { CommandProps, ICommand } from '../../interfaces/ICommand'
import { Biblioteca } from '../Biblioteca'
import { OutputHandler } from '../OutputHandler'

export class CommandNotificacoes implements ICommand {
  execute([codUsuario]: CommandProps): void {
    const biblioteca = Biblioteca.obterInstancia()
    const usuario = biblioteca.consultarUsuario(codUsuario)

    if(!usuario) {
      OutputHandler.ErrorOutput('Usuario inexistente')
      return
    }

    OutputHandler.SuccessOutput(`Quantidade de notificações: ${usuario.obterNotificacoes()}`)
  }
}