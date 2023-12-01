
export type CommandProps = {
  codLivro: string,
  codUsuario?: string
}
export interface ICommand {
  execute(props: CommandProps): void;
}