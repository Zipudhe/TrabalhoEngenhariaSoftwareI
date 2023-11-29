import { IUsuario } from "../interfaces/IUsuario"

export abstract class Usuario implements IUsuario {
  constructor(
    protected codigo: number,
    protected nome: string,
    protected tempoEmprestimo: number,
  ) { }

  public obterNome(): string {
    return this.nome;
  }

  public obterCodigo(): number {
    return this.codigo;
  }

  public obterTempoEmprestimo(): number {
    return this.tempoEmprestimo;
  }
}
