import { Livro } from '../Entities/Livro'

export interface IValidador {
  validarEmprestimo: (livro: Livro) => boolean
}