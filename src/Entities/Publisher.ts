import { ISubscribers } from "../interfaces/ISubscribers"
import { Subscriber } from "./Subscriber"


export class Publisher {
  private subscribers: Map<number, ISubscribers> = new Map()

  public subscribe(codigoUsuario: number): void {
    const subscriber: ISubscribers = new Subscriber(); 
    this.subscribers.set(codigoUsuario, subscriber)
  }

  public unsubscribe(codigoUsuario: number): void {
    const index = this.subscribers.delete(codigoUsuario)
  }

  public notify(codigoUsuario: number): void {
    this.subscribers.forEach(subscriber => subscriber.update(codigoUsuario))
  }
}