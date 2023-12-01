import { Usuario } from "./Usuario";
import { AlunoGraduacao } from './AlunoGraduacao'
import { AlunoPosGraduacao } from './AlunoPosGraduacao'
import { Professor } from './Professor'
import { Database, IDatabaseUser } from '../database'

export class GerenciadorUsuarios {
  constructor() {}
  
  //@ts-ignore
  public obterUsuarios(): Usuario[] {
    const database = Database.getInstance()

    const databaseUsers = database.getUsuarios()
    
    const usuarios = databaseUsers.map((databaseUser: IDatabaseUser) => {
      switch(databaseUser.tipo_usuario) {
        case 'AlunoGraduacao':
          return new AlunoGraduacao(databaseUser.codigo, databaseUser.nome)
        case 'AlunoPosGraduacao':
          return new AlunoPosGraduacao(databaseUser.codigo, databaseUser.nome)
        case 'Professor':
          return new Professor(databaseUser.codigo, databaseUser.nome)
      }
    })
    
    return usuarios
  }
}