import { IUsuario } from "../interfaces/IUsuario"
import { IValidador } from "../interfaces/IValidador"
import { Livro } from "./Livro";
import { OutputHandler } from "./OutputHandler";
import { StatusEmprestimo, Emprestimo } from './Emprestimo'
import { Reserva } from "./Reserva";
import { ValidadorAluno } from "./ValidadorAluno";


export abstract class Usuario implements IUsuario {
  // @ts-ignore
  protected tempoEmprestimo: number = 0
  protected emprestimos: Emprestimo[] = []
  protected reservas: Reserva[] = []
  protected notificacoes: number = 0
  
  constructor(
    protected codigo: number,
    protected nome: string,
    protected limiteEmprestimo: number,
    private validador: IValidador
  ) {
  }

  public obterNome(): string {
    return this.nome;
  }

  public obterCodigo(): number {
    return this.codigo;
  }

  public obterTempoEmprestimo(): number {
    return this.tempoEmprestimo;
  }

  public obterLimiteEmprestimo(): number {
    return this.limiteEmprestimo
  }

  public temAtrasos(): boolean {
    return this.emprestimos.some(emprestimo => emprestimo.estaAtrasado())
  }

  public obterEmprestimosFinalizados() {
    return this.emprestimos.filter(emprestimo => emprestimo.obteStatusEmprestimo() == StatusEmprestimo.Finalizado)
  }
  
  public obterEmprestimosEmCurso() {
    return this.emprestimos.filter(emprestimo => emprestimo.obteStatusEmprestimo() == StatusEmprestimo.EmCurso)
  }

  public obterEmprestimo(codExemplar: number) {
    return this.emprestimos.find(emprestimo => emprestimo.obterCodExemplar() == codExemplar)
  }

  public obterEmprestimos() {
    return this.emprestimos
  }

  public quantidadeReservas(): number {
    return this.reservas.length
  }

  public emprestarLivro(livro: Livro): void {
    if(!this.validador.validarEmprestimo(livro, this)) {
      return
    }

    const codExemplar = livro.emprestar(this.codigo)
    const emprestimo = new Emprestimo(livro.obterCodigo(), codExemplar, this.tempoEmprestimo)
    this.emprestimos.push(emprestimo)
    OutputHandler.SuccessOutput("Livro emprestado com sucesso")
  }

  public devolverLivro(livro: Livro) {
    const emprestimoEmCurso = this.obterEmprestimosEmCurso().find(emprestimo => emprestimo.obterCodLivro() == livro.obterCodigo())
    if(emprestimoEmCurso) {
      emprestimoEmCurso.finalizarEmprestimo()
      livro.devolver()
    }
  }

  public reservarLivro(livro: Livro): void {
    if(!this.validador.validarReserva(livro, this)) {
      OutputHandler.reservaStatus(this.nome, livro.obterTitulo(), false)
      return
    }

    const codExemplar = livro.reservar(this.codigo)
    const reserva = new Reserva(livro.obterCodigo(), codExemplar)
    this.reservas.push(reserva)
    OutputHandler.reservaStatus(this.nome, livro.obterTitulo(), true)
  }
  
  public atualizarNotificacoes(): void {
    console.log('called atualizar notificacoes')
    this.notificacoes += 1
  }

  public obterNotificacoes(): number {
    return this.notificacoes
  }
}
