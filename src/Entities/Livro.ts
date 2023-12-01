import { Exemplar } from './Exemplar'

export class Livro {
  private exemplares: Exemplar[] = [];

  constructor(
    private readonly codigo: number,
    private readonly titulo: string,
    private autores: string,
    private edicao: string,
    private anoPublicacao: number,
    private editora: string,
  ){}

  public getCodigo(): number {
    return this.codigo;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getAutores(): string {
    return this.autores;
  }

  public getEdicao(): string {
    return this.edicao;
  }

  public getAnoPublicacao(): number {
    return this.anoPublicacao;
  }

  public getEditora(): string {
    return this.editora;
  }

  public adicionarExemplar(exemplar: Exemplar): void {
    this.exemplares.push(exemplar);
  }

  public obterExemplares() {
    return this.exemplares
  }

  public checarDisponibilidadeExemplares(): boolean {
    return this.exemplares.length > 0
  }

  public emprestar(): number {
    const exemplarDisponivel = this.exemplares.find(exemplar => exemplar.getStatus() === 'Disponível');
    if (exemplarDisponivel) {
      exemplarDisponivel.setStatus('Indisponível');
      return exemplarDisponivel.getCodigo();
    } else {
      throw new Error('Não há exemplares disponíveis');
    }
  }
}