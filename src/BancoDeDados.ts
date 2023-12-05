import * as fs from 'fs';

const filePath = 'dadosTeste.json';

export interface IBancoDeDadosUsuario {
  codigo: number;
  tipo_usuario: 'AlunoGraduacao' | 'AlunoPosGraduacao' | 'Professor';
  nome: string;
}

export interface IBancoDeDadosLivro {
  codigo: number;
  titulo: string;
  editora: string;
  autores: string;
  edicao: string;
  ano_publicacao: number;
}

export interface IBancoDeDadosExemplar {
  codigo_livro: number;
  codigo_exemplar: number;
  titulo_exemplar: 'Disponível' | 'Indisponível';
}

interface IBancoDeDadosEmprestimo {
  codigo_emprestimo: number;
  codigo_livro: number;
  codigo_exemplar: number;
  codigo_usuario: number;
}

interface IBancoDeDados {
  usuarios: IBancoDeDadosUsuario[];
  livros: IBancoDeDadosLivro[];
  exemplares: IBancoDeDadosExemplar[];
  emprestimos: IBancoDeDadosEmprestimo[];
}

function readJsonFile(): IBancoDeDados | null {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    return null;
  }
}

export class BancoDeDados {
  private static instance: BancoDeDados;
  private data: IBancoDeDados = readJsonFile() || {
    usuarios: [],
    livros: [],
    exemplares: [],
    emprestimos: []
  };

  public static getInstance(): BancoDeDados {
    if (!BancoDeDados.instance) {
      BancoDeDados.instance = new BancoDeDados();
    }
    return BancoDeDados.instance;
  }

  public getUsuarios(): IBancoDeDadosUsuario[] {
    return this.data.usuarios;
  }

  public getUsuario(id: number): IBancoDeDadosUsuario {
    const user = this.data.usuarios.filter(_ => _.codigo === id)[0];
    return user;
  }

  public postUsuarios(usuario: IBancoDeDadosUsuario): void {
    this.data.usuarios.push(usuario);
  }

  public putUsuario(id: number, data: Partial<IBancoDeDadosUsuario>): void {
    let user = this.data.usuarios.filter(_ => _.codigo === id)[0];
    user = { 
      codigo: data.codigo || user.codigo,
      nome: data.nome ||  user.nome,
      tipo_usuario: data.tipo_usuario || user.tipo_usuario
    };
    const arr = this.data.usuarios.filter(_ => _.codigo !== id);
    arr.push(user);
    this.data.usuarios.length = 0;
    this.data.usuarios.push(...arr);
  }

  public deleteUsuario(id: number): void {
    const arr = this.data.usuarios.filter(_ => _.codigo !== id);
    this.data.usuarios.length = 0;
    this.data.usuarios.push(...arr);
  }

  public getLivros(): IBancoDeDadosLivro[] {
    return this.data.livros;
  }

  public getLivro(id: number): IBancoDeDadosLivro {
    const book = this.data.livros.filter(_ => _.codigo === id)[0];
    return book;
  }

  public postLivros(livro: IBancoDeDadosLivro): void {
    this.data.livros.push(livro);
  }

  public putLivro(id: number, data: Partial<IBancoDeDadosLivro>): void {
    let book = this.data.livros.filter(_ => _.codigo === id)[0];
    book = {
      codigo: data.codigo || book.codigo,
      autores: data.autores || book.autores,
      editora: data.editora || book.editora,
      edicao: data.edicao || book.edicao,
      titulo: data.titulo || book.titulo,
      ano_publicacao: data.ano_publicacao || book.ano_publicacao,
    };
    const arr = this.data.livros.filter(_ => _.codigo !== id);
    arr.push(book);
    this.data.livros.length = 0;
    this.data.livros.push(...arr);
  }

  public deleteLivro(id: number): void {
    const arr = this.data.livros.filter(_ => _.codigo !== id);
    this.data.livros.length = 0;
    this.data.livros.push(...arr);
  }

  public getExemplares(): IBancoDeDadosExemplar[] {
    return this.data.exemplares;
  }

  public getExemplaresByLivro(bookId: number): IBancoDeDadosExemplar[] {
    const exemplaries = this.data.exemplares.filter(_ => _.codigo_livro === bookId);
    return exemplaries;
  }

  public getExemplar(id: number): IBancoDeDadosExemplar {
    const exemplary = this.data.exemplares.filter(_ => _.codigo_exemplar === id)[0];
    return exemplary;
  }

  public postExemplares(exemplar: IBancoDeDadosExemplar): void {
    this.data.exemplares.push(exemplar);
  }

  public putExemplar(id: number, data: Partial<IBancoDeDadosExemplar>): void {
    let exemplary = this.data.exemplares.filter(_ => _.codigo_exemplar === id)[0];
    exemplary = {
      codigo_exemplar: data.codigo_exemplar || exemplary.codigo_exemplar,
      codigo_livro: data.codigo_livro || exemplary.codigo_livro,
      titulo_exemplar: data.titulo_exemplar || exemplary.titulo_exemplar,
    };
    const arr = this.data.exemplares.filter(_ => _.codigo_exemplar !== id);
    arr.push(exemplary);
    this.data.exemplares.length = 0;
    this.data.exemplares.push(...arr);
  }

  public deleteExemplar(id: number): void {
    const arr = this.data.exemplares.filter(_ => _.codigo_exemplar !== id);
    this.data.exemplares.length = 0;
    this.data.exemplares.push(...arr);
  }

  public getEmprestimos(): IBancoDeDadosEmprestimo[] {
    return this.data.emprestimos;
  }

  public getEmprestimo(id: number): IBancoDeDadosEmprestimo {
    const lend = this.data.emprestimos.filter(_ => _.codigo_emprestimo === id)[0];
    return lend;
  }

  public postEmprestimos(emprestimo: IBancoDeDadosEmprestimo): void {
    this.data.emprestimos.push(emprestimo);
  }

  public putEmprestimo(id: number, data: Partial<IBancoDeDadosEmprestimo>): void {
    let lend = this.data.emprestimos.filter(_ => _.codigo_emprestimo === id)[0];
    lend = {
      codigo_emprestimo: data.codigo_emprestimo || lend.codigo_emprestimo,
      codigo_exemplar: data.codigo_exemplar || lend.codigo_exemplar,
      codigo_livro: data.codigo_livro || lend.codigo_livro,
      codigo_usuario: data.codigo_usuario || lend.codigo_usuario,
    };
    const arr = this.data.emprestimos.filter(_ => _.codigo_emprestimo !== id);
    arr.push(lend);
    this.data.emprestimos.length = 0;
    this.data.emprestimos.push(...arr);
  }

  public deleteEmprestimo(id: number): void {
    const arr = this.data.emprestimos.filter(_ => _.codigo_emprestimo !== id);
    this.data.emprestimos.length = 0;
    this.data.emprestimos.push(...arr);
  }
}

export default BancoDeDados;
