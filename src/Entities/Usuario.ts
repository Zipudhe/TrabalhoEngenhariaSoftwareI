import { IUsuario } from "../interfaces/IUsuario"
import { IValidador } from "../interfaces/IValidador"
import { Livro } from "./Livro";
import { OutputHandler } from "./OutputHandler";
import { StatusEmprestimo, Emprestimo } from './Emprestimo'
import { Reserva } from "./Reserva";


export abstract class Usuario implements IUsuario {
  // @ts-ignore
  protected tempoEmprestimo: number = 0
  protected emprestimos: Emprestimo[] = []
  protected reservas: Reserva[] = []
  
  constructor(
    protected codigo: number,
    protected nome: string,
    protected limiteEmprestimo: number,
    private validador: IValidador
  ) {}

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

  public obterEmprestimos() {
    return this.emprestimos
  }

  public emprestarLivro(livro: Livro): void {
    if(!this.validador.validar(livro, this)) {
      return
    }

    const codExemplar = livro.emprestar()
    const emprestimo = new Emprestimo(livro.getCodigo(), codExemplar, this.tempoEmprestimo)
    this.emprestimos.push(emprestimo)
    OutputHandler.SuccessOutput("Livro emprestado com sucesso")
  }

  public devolverLivro(livro: Livro) {
    const emprestimoEmCurso = this.obterEmprestimosEmCurso().find(emprestimo => emprestimo.obterCodLivro() == livro.getCodigo())
    if(emprestimoEmCurso) {
      emprestimoEmCurso.devolverLivro()
      livro.devolver()
    }
  }

  public reservarLivro(livro: Livro): void {
    if(!this.validador.validar(livro, this)) {
      return
    }

    const codExemplar = livro.reservar()
    const reserva = new Reserva(livro.getCodigo(), codExemplar)
    this.reservas.push(reserva)
    OutputHandler.SuccessOutput("Livro reservado com sucesso")
  }
}
