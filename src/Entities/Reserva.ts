export class Reserva {
  constructor(
    private codLivro: number,
    private codExemplar: number
  ) {}

  public obterCodLivro() {
    return this.codLivro
  }

  public obterCodExemplar() {
    return this.codExemplar
  }
}
