import { Biblioteca } from './Biblioteca';
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

  public obterCodigo(): number {
    return this.codigo;
  }

  public obterTitulo(): string {
    return this.titulo;
  }

  public obterAutores(): string {
    return this.autores;
  }

  public obterEdicaco(): string {
    return this.edicao;
  }

  public obterAnoPublicacao(): number {
    return this.anoPublicacao;
  }

  public obterEditora(): string {
    return this.editora;
  }

  public adicionarExemplar(exemplar: Exemplar): void {
    this.exemplares.push(exemplar);
  }

  public obterExemplares() {
    return this.exemplares
  }
  
  public obterExemplarDisponivel(): Exemplar | undefined {
    return this.exemplares.find(exemplar =>  exemplar.obterStatus() == 'Disponível')
  }

  public obterExamplaresDisponiveis(): Exemplar[] {
      return this.exemplares.filter(exemplar => exemplar.obterStatus() == 'Disponível')
  }

  public checarDisponibilidadeExemplares(): boolean {
    return this.obterExamplaresDisponiveis().length > 0
  }

  public emprestar(codUsuario: number): number {
    const exemplarDisponivel = this.exemplares.find(exemplar => exemplar.obterStatus() === 'Disponível' || exemplar.obterStatus() === 'Reservado');
    console.log({ exemplarDisponivel })
    if (exemplarDisponivel) {
      exemplarDisponivel.atualizarStatus('Indisponível');
      exemplarDisponivel.adicionarUsuario(codUsuario)
      return exemplarDisponivel.obterCodigo();
    } else {
      throw new Error('Não há exemplares disponíveis');
    }
  }

  public devolver(): void {
    const exemplar = this.exemplares.find(exemplar => exemplar.obterStatus() == 'Indisponível')
    
    exemplar && exemplar.atualizarStatus('Disponível')
  }

  public reservar(codUsuario: number): number {
    const exemplar = this.exemplares.find(exemplar => exemplar.obterStatus() ==  'Disponível')!
    exemplar.atualizarStatus('Reservado')
    exemplar.adicionarUsuario(codUsuario)

    const livrosReservados = this.exemplares.filter(exemplar => exemplar.obterStatus() == 'Reservado').length
    
    if(livrosReservados == 2) {
      const biblioteca = Biblioteca.obterInstancia()
      biblioteca.EventManager.notify(this.obterCodigo())
    }
    
    return this.obterCodigo();
  }
}