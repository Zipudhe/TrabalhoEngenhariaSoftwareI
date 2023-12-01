import { Livro } from '../Entities/Livro'
import { Usuario } from '../Entities/Usuario'

export interface IValidador {
  validar: (livro: Livro, usuario: Usuario) => boolean
}