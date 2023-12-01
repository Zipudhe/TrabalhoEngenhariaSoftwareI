import { IValidador } from "../interfaces/IValidador";
import { Livro } from "./Livro";
import { OutputHandler } from "./OutputHandler";
import { Usuario } from "./Usuario";

export class ValidadorAluno implements IValidador {
  validar(livro: Livro, usuario: Usuario): boolean {
      // if(!livro.checarDisponibilidadeExemplares()) {
      //   OutputHandler.ErrorOutput('Livro sem exemplares disponíveis')
      //   return false
      // }

      if(usuario.temAtrasos()) {
        OutputHandler.ErrorOutput('Usuario com atrasos')
        return false
      }

      if(usuario.obterEmprestimosEmCurso().length >= usuario.obterLimiteEmprestimo()) {
        OutputHandler.ErrorOutput('Limite de emprestímo excedido')
        return false
      }

      if(usuario.obterEmprestimosEmCurso().find(emprestimo => emprestimo.obterCodLivro() == livro.getCodigo())) {
        OutputHandler.ErrorOutput('Usuario já está com este livro')
        return false
      }

      const exemplares = livro.obterExemplares()
      if(exemplares.every(exemplar => exemplar.obterStatus() == 'Indisponível' || exemplar.obterStatus() == 'Reservado')) {
        OutputHandler.ErrorOutput('Livro sem exemplares disponíveis')
        return false
      }

    return true
  };
}