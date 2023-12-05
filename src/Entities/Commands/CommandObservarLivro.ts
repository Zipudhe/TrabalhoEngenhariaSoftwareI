import { CommandProps, ICommand } from "../../interfaces/ICommand";
import { Biblioteca } from "../Biblioteca";
import { OutputHandler } from "../OutputHandler";
import { Professor } from "../Professor";

export class CommandObservarLivro implements ICommand {
  execute([codUsuario, codLivro]: CommandProps): void {
      const biblioteca = Biblioteca.obterInstancia()
      const usuario = biblioteca.consultarUsuario(codUsuario)
      const livro = biblioteca.consultarLivro(codLivro)

      if(!livro || !usuario) {
        OutputHandler.ErrorOutput('Usuario ou livro não encontrado')
        return
      }

      if(!(usuario instanceof Professor)) {
        OutputHandler.ErrorOutput('Apenas professores podem realizar esse comando')
        return
      }

      biblioteca.EventManager.subscribe(codLivro, usuario as Professor)
  }
}