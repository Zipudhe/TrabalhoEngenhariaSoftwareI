import { ISubscribers } from "../interfaces/ISubscribers"
import { Professor } from "./Professor"
// import { Usuario } from "./Usuario"

export class Subscriber implements ISubscribers {
  constructor(private usuario: Professor){}

  public update(): void {
    this.usuario.atualizarNotificacoes()
  }
}