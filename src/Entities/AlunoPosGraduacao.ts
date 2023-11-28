import { IUsuario } from "../interfaces/IUsuario"

export class AlunoPosGraduacao implements IUsuario {
  constructor(
    private codigo: number,
    private nome: string,
    private tempoEmprestimo: number,
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