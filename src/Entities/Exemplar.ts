type Status = 'Disponível' | 'Indisponível' | 'Reservado';

export class Exemplar {
  constructor(private readonly codigo: number, private status: Status) { }

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