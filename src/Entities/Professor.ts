import { Usuario } from "./Usuario";
import { ValidadorProfessor } from "./ValidadorProfessor";

export class Professor extends Usuario {
  protected tempoEmprestimo = 7;
}
