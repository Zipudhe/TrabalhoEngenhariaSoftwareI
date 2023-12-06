import { IValidador } from "../interfaces/IValidador";
import { Livro } from "./Livro";
import { OutputHandler } from "./OutputHandler";
import { Usuario } from "./Usuario";

export class ValidadorAluno implements IValidador {
  validarEmprestimo(livro: Livro, usuario: Usuario): boolean {
      if(usuario.temAtrasos()) {
        OutputHandler.ErrorOutput('Usuario com atrasos')
        return false
      }

      if(usuario.obterEmprestimosEmCurso().length >= usuario.obterLimiteEmprestimo()) {
        OutputHandler.ErrorOutput('Limite de emprestímo excedido')
        return false
      }

      if(usuario.obterEmprestimosEmCurso().find(emprestimo => emprestimo.obterCodLivro() == livro.obterCodigo())) {
        OutputHandler.ErrorOutput('Usuario já está com este livro')
        return false
      }

      const exemplares = livro.obterExemplares()
      const exemplaresReservados = exemplares.filter(exemplar => exemplar.obterStatus() == 'Reservado')
      const podeEmprestar = exemplaresReservados.length > 0 ? exemplaresReservados.find(exemplar => exemplar.obterStatus() == 'Reservado' && exemplar.obterCodigoUsuario() == usuario.obterCodigo()) : true
      if(
        exemplares.every(exemplar => exemplar.obterStatus() == 'Indisponível')
          ||
        !podeEmprestar
        ) {
        OutputHandler.ErrorOutput('Livro sem exemplares disponíveis')
        return false
      }

    return true
  };

  validarReserva(livro: Livro, usuario: Usuario): boolean {
    if(!livro.checarDisponibilidadeExemplares() || usuario.quantidadeReservas() >= 3) {
      return false
    }
    
    return true
  }
}