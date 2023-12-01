import { IUsuario } from "../interfaces/IUsuario"
import { IValidador } from "../interfaces/IValidador"
import { Livro } from "./Livro";

export abstract class Usuario implements IUsuario {
  // @ts-ignore
  private validador: IValidador
  protected tempoEmprestimo: number = 0
  
  constructor(
    protected codigo: number,
    protected nome: string,
  ) {}

  public obterNome(): string {
    return this.nome;
  }

  public obterCodigo(): number {
    return this.codigo;
  }

  public obterTempoEmprestimo(): number {
    return this.tempoEmprestimo;
  }

  public emprestarLivro(livro: Livro) {
    if(this.validador.validarEmprestimo(livro)) {
      // ações para validar livro
    }
  }
}
