type Status = 'Disponível' | 'Indisponível' | 'Reservado';

export class Exemplar {
  private codigoUsuario: number = 0
  constructor(private readonly codigo: number, private status: Status) { }

  public obterCodigoUsuario() {
    return this.codigoUsuario
  }

  public adicionarUsuario(codUsuario: number) {
    this.codigoUsuario = codUsuario
  }

  public removerUsuario() {
    this.codigoUsuario = 0
  }

  public obterCodigo(): number {
    return this.codigo;
  }

  public obterStatus(): Status {
    return this.status;
  }

  public atualizarStatus(status: Status): void {
    this.status = status;
  }
}