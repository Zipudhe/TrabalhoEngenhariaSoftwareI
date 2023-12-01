
export type CommandProps = {
  codLivro: number,
  codUsuario?: number
}
export interface ICommand {
  execute(props: CommandProps): void;
}