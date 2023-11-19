export default interface ICommand {
  context: string;
  execute(
    cod_usuario: string,
    cod_livro: string
  ): string;
}