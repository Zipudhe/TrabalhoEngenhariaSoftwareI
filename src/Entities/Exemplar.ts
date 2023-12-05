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

  public getCodigo(): number {
    return this.codigo;
  }

  public getStatus(): Status {
    return this.status;
  }

  public setStatus(status: Status): void {
    this.status = status;
  }

  public obterStatus() {
    return this.status
  }
}