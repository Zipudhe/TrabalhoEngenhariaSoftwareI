import { CommandProps, ICommand } from '../../interfaces/ICommand'
import { Biblioteca } from '../Biblioteca'
import { OutputHandler } from '../OutputHandler'

export class CommandConsultaUsuario implements ICommand {
  execute([codUsuario]: CommandProps): void {
      const biblioteca = Biblioteca.obterInstancia()

      if(!codUsuario) {
        OutputHandler.ErrorOutput('É preciso passar um codigo de usuario') 
        return
      }

    const usuario = biblioteca.consultarUsuario(codUsuario)
    if(!usuario) {
      OutputHandler.ErrorOutput('Usuario não encontrado') 
      return
    }

    OutputHandler.mostrarUsuarioInfo(usuario)
  }
}