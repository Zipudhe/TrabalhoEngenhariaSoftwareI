import * as fs from 'fs';

const filePath = 'dadosTeste.json';

export interface IDatabaseUser {
  codigo: number;
  tipo_usuario: 'AlunoGraduacao' | 'AlunoPosGraduacao' | 'Professor';
  nome: string;
}

export interface IDatabaseBook {
  codigo: number;
  titulo: string;
  editora: string;
  autores: string;
  edicao: string;
  ano_publicacao: number;
}

export interface IDatabaseExemplary {
  codigo_livro: number;
  codigo_exemplar: number;
  titulo_exemplar: 'Disponível' | 'Indisponível';
}

interface IDatabaseLend {
  codigo_emprestimo: number;
  codigo_livro: number;
  codigo_exemplar: number;
  codigo_usuario: number;
}

interface IDatabase {
  usuarios: IDatabaseUser[];
  livros: IDatabaseBook[];
  exemplares: IDatabaseExemplary[];
  emprestimos: IDatabaseLend[];
}

function readJsonFile(): IDatabase | null {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler o arquivo JSON:', error);
    return null;
  }
}

export class Database {
  private static instance: Database;
  private data: IDatabase = readJsonFile() || {
    usuarios: [],
    livros: [],
    exemplares: [],
    emprestimos: []
  };

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getUsuarios(): IDatabaseUser[] {
    return this.data.usuarios;
  }

  public getUsuario(id: number): IDatabaseUser {
    const user = this.data.usuarios.filter(_ => _.codigo === id)[0];
    return user;
  }

  public postUsuarios(usuario: IDatabaseUser): void {
    this.data.usuarios.push(usuario);
  }

  public putUsuario(id: number, data: Partial<IDatabaseUser>): void {
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

  public getLivros(): IDatabaseBook[] {
    return this.data.livros;
  }

  public getLivro(id: number): IDatabaseBook {
    const book = this.data.livros.filter(_ => _.codigo === id)[0];
    return book;
  }

  public postLivros(livro: IDatabaseBook): void {
    this.data.livros.push(livro);
  }

  public putLivro(id: number, data: Partial<IDatabaseBook>): void {
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

  public getExemplares(): IDatabaseExemplary[] {
    return this.data.exemplares;
  }

  public getExemplaresByLivro(bookId: number): IDatabaseExemplary[] {
    const exemplaries = this.data.exemplares.filter(_ => _.codigo_livro === bookId);
    return exemplaries;
  }

  public getExemplar(id: number): IDatabaseExemplary {
    const exemplary = this.data.exemplares.filter(_ => _.codigo_exemplar === id)[0];
    return exemplary;
  }

  public postExemplares(exemplar: IDatabaseExemplary): void {
    this.data.exemplares.push(exemplar);
  }

  public putExemplar(id: number, data: Partial<IDatabaseExemplary>): void {
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

  public getEmprestimos(): IDatabaseLend[] {
    return this.data.emprestimos;
  }

  public getEmprestimo(id: number): IDatabaseLend {
    const lend = this.data.emprestimos.filter(_ => _.codigo_emprestimo === id)[0];
    return lend;
  }

  public postEmprestimos(emprestimo: IDatabaseLend): void {
    this.data.emprestimos.push(emprestimo);
  }

  public putEmprestimo(id: number, data: Partial<IDatabaseLend>): void {
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

export default Database;

// MVC - Model View Controller
// Modules - Controller -> Service -> Repositório
/*
  Usuario -> biblioteca -> database


  Design Facade [Biblioteca]
  Main -> Biblioteca -> database
  Main -> GerenciadorLivrosAluno.emprestarLivro(Usuario  usuario) -> {
    usuario.obterTempoEmprestimo()
        
  }  
*/