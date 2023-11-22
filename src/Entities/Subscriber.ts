import { ISubscribers } from "../interfaces/ISubscribers"

export class Subscriber implements ISubscribers {
  private qtdNotifications: number = 0

  public update(codigoUsuario: number): void {
    this.qtdNotifications++
    console.log(`O usuário ${codigoUsuario} foi notificado.`)
  }
}