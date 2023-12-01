export enum StatusEmprestimo {
  EmCurso = 'Em Curso',
  Finalizado = 'Finalizado'
}

export class Emprestimo {
  private dataEmprestimo: Date
  private dataEntrega: Date
  private statusEmprestimo: StatusEmprestimo

  constructor(
    private codLivro: number,
    private codExemplar: number,
    tempoEmprestimo: number
  ) {
    this.dataEmprestimo = new Date()
    this.statusEmprestimo = StatusEmprestimo.EmCurso
    this.dataEntrega = this.calcularDataEntrega(tempoEmprestimo)
  }

  public obterCodLivro() {
    return this.codLivro
  }

  public obterCodExemplar() {
    return this.codExemplar
  }

  public devolverLivro(): void {
    this.statusEmprestimo = StatusEmprestimo.Finalizado
  }

  public estaAtrasado(): boolean {
    const currentDate = new Date()
    
    if(currentDate > this.dataEntrega) {
      return true
    }

    return false
  }

  private calcularDataEntrega(tempoEmprestimo: number): Date {
    const entrega = new Date()
    entrega.setDate(this.dataEmprestimo.getDate() + tempoEmprestimo)

    return entrega
  }

  public obteStatusEmprestimo() {
    return this.statusEmprestimo
  }
}