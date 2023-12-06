import { Usuario } from "./Usuario";
import { AlunoGraduacao } from './AlunoGraduacao'
import { AlunoPosGraduacao } from './AlunoPosGraduacao'
import { Professor } from './Professor'

import { BancoDeDados, IBancoDeDadosUsuario } from '../BancoDeDados'
import { ValidadorAluno } from './ValidadorAluno'
import { ValidadorProfessor } from './ValidadorProfessor'

export class GerenciadorUsuarios {
  private database = BancoDeDados.getInstance() 
  constructor() {}
  
  //@ts-ignore
  public obterUsuarios(): Usuario[] {

    const databaseUsers = this.database.getUsuarios()
    
    const usuarios = databaseUsers.map((databaseUser: IBancoDeDadosUsuario) => {
      switch(databaseUser.tipo_usuario) {
        case 'AlunoGraduacao':
          return new AlunoGraduacao(databaseUser.codigo, databaseUser.nome, 3, new ValidadorAluno())
        case 'AlunoPosGraduacao':
          return new AlunoPosGraduacao(databaseUser.codigo, databaseUser.nome, 4, new ValidadorAluno())
        case 'Professor':
          return new Professor(databaseUser.codigo, databaseUser.nome, Number.MAX_VALUE, new ValidadorProfessor())
      }
    })
    
    return usuarios
  }
}