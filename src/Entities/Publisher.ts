import { ISubscribers } from "../interfaces/ISubscribers"
import { Professor } from "./Professor";
import { Subscriber } from "./Subscriber"


export class Publisher {
  private subscribers: Map<number, ISubscribers> = new Map()

  public subscribe(codigoLivro: number, usuario: Professor): void {
    // TODO: checar se usuario é da classe Professor
    const subscriber: ISubscribers = new Subscriber(usuario); // Lidar com os efeitos colaterais de ser professor
    this.subscribers.set(codigoLivro, subscriber)
  }

  public unsubscribe(codigoLivro: number): void {
    const index = this.subscribers.delete(codigoLivro)
  }

  public notify(codigoLivro: number): void {
    this.subscribers.forEach(subscriber => subscriber.update(codigoLivro))
  }
}