import { Livro } from '../Entities/Livro'
import { Usuario } from '../Entities/Usuario'

export interface IValidador {
  validarEmprestimo: (livro: Livro, usuario: Usuario) => boolean
  validarReserva: (livro: Livro, usuario: Usuario) => boolean
}