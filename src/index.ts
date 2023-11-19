import figlet from 'figlet';
import { Command } from 'commander';
import { LendBook } from './modules/commands/lend-book';
import Database from './database';

console.log(figlet.textSync("Eng. Software 1"));

const program = new Command();

program
  .version("1.0.0")
  .description("CLI para gerenciamento de uma biblioteca")
  .option("-emp, --emprestimo <cods...>", "empréstimo")
  .option("-dev, --devolucao <cods...>", "devolução")
  .option("-res, --reserva <cods...>", "reserva")
  .option("-obs, --observacao <cods...>", "observação")
  .option("-liv, --livro <cod_livro>", "consulta livro")
  .option("-usu, --usuario <cod_usuario>", "consulta usuário")
  .option("-ntf, --notificacoes <cod_usuario>", "consulta notificações")
  .parse(process.argv);

const options = program.opts();
const database = new Database();

function emprestimo(cod_usuario: string, cod_livro: string) {
  try {
    const lendBook = new LendBook(database);
    lendBook.execute(cod_usuario, cod_livro);
  } catch (error) {
    console.error("Error occurred while processing the loan!", error);
  }
}

function devolucao() {
  try {
    console.log('Realizando devolução');
    // Adicione aqui a lógica da devolução
  } catch (error) {
    console.error("Error occurred while processing the return!", error);
  }
}

if (options.emprestimo) {
  const [cod_usuario, cod_livro] = options.emprestimo;
  emprestimo(cod_usuario, cod_livro);
} else if (options.devolucao) {
  const [cod_usuario, cod_livro] = options.devolucao;
  devolucao()
} else if (options.reserva) {
  const [cod_usuario, cod_livro] = options.reserva;
  console.log('Ainda falta ser implementado!');
} else if (options.observacao) {
  const [cod_usuario, cod_livro] = options.observacao;
  console.log('Ainda falta ser implementado!');
} else if (options.livro) {
  console.log('Ainda falta ser implementado!');
} else if (options.usuario) {
  console.log('Ainda falta ser implementado!');
} else if (options.notificacoes) {
  console.log('Ainda falta ser implementado!');
} 
