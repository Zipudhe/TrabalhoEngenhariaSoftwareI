import { Usuario } from "./Usuario";

export class AlunoPosGraduacao extends Usuario {
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
