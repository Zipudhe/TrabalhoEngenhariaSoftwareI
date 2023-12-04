import { ISubscribers } from "../interfaces/ISubscribers"
import { Professor } from "./Professor";
import { Subscriber } from "./Subscriber"


export class Publisher {
  private subscribers: Map<string, ISubscribers> = new Map()

  public subscribe(codigoLivro: number, usuario: Professor): void {
    const subscriber: ISubscribers = new Subscriber(usuario); // Lidar com os efeitos colaterais de ser professor
    const key = `${codigoLivro}__${usuario.obterCodigo()}`
    this.subscribers.set(key, subscriber)
  }

  public unsubscribe(codigoLivro: number, usuario: Professor): void {
    const key = `${codigoLivro}__${usuario.obterCodigo()}`
    this.subscribers.delete(key)
  }

  public notify(codigoLivro: number): void {
    const entradas = this.subscribers.entries()
    for(let sub of entradas) {
      const [codigoLivro, codigoUsuario] = sub[0].split('__')
      if(sub[0].includes(codigoLivro.toString())) {
        sub[1].update(Number.parseInt(codigoUsuario))
      }
    }
  }
}