import { IValidador } from "../interfaces/IValidador";
import { Livro } from "./Livro";
import { OutputHandler } from "./OutputHandler";
import { Usuario } from "./Usuario";

export class ValidadorProfessor implements IValidador {
  validarEmprestimo(livro: Livro, usuario: Usuario): boolean {
      if(!livro.checarDisponibilidadeExemplares()) {
        OutputHandler.ErrorOutput('Livro sem exemplares disponíveis')
        return false
      }

      if(usuario.temAtrasos()) {
        return false
      }

      const exemplares = livro.obterExemplares()
      if(exemplares.every(exemplar => exemplar.obterStatus() == 'Indisponível')) {
        return false
      }

    return true
  };

  validarReserva(livro: Livro, usuario: Usuario) {
    if(!livro.checarDisponibilidadeExemplares()) {
      return false
    }

    return true
  };
}