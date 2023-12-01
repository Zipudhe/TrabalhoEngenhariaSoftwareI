import { Usuario } from "./Usuario";

export class AlunoGraduacao extends Usuario {
  protected tempoEmprestimo = 3;
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
