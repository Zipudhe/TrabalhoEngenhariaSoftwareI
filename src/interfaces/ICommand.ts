
export type CommandProps = number[]
export interface ICommand {
  execute(props: CommandProps): void;
}