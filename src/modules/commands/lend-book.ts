import Database from "../../database";
import ICommand from "./command.interface";

export class LendBook implements ICommand {
  context: string;
  constructor(
    private readonly database: Database,
  ) {
    this.context = 'emp';
  }

  /**
   * Recebe código do usuário e código do livro, procura exemplares,
   * caso tenha um exemplar aluga e seta ele como indisponível,
   */
  execute(
    userId: string,
    bookId: string
  ): string {
    const user = this.database.getUsuario(Number(userId));
    const exemplaries = this.database.getExemplaresByLivro(Number(bookId));
    const exemplary: {
      codigo_livro: number;
      codigo_exemplar: number;
      titulo_exemplar: 'Disponível' | 'Indisponível';
    } | undefined = exemplaries.filter(_ => _.titulo_exemplar === 'Disponível')[0];

    if (!exemplary) {
      return 'Nenhum exemplar do livro está disponível no momento!';
    }

    const lends = this.database.getEmprestimos();
    let lastLendId = lends.reduce((lastItem, _) => (_.codigo_emprestimo > (lastItem?.codigo_emprestimo || 0) ? _ : lastItem)).codigo_emprestimo || 0;
    lastLendId++;
    this.database.postEmprestimos({
      codigo_emprestimo: lastLendId,
      codigo_livro: exemplary.codigo_livro,
      codigo_exemplar: exemplary.codigo_exemplar,
      codigo_usuario: user.codigo
    });

    this.database.putExemplar(exemplary.codigo_exemplar, {
      titulo_exemplar: 'Indisponível',
    });

    return 'Exemplar alugado com sucesso!';
  }
}
