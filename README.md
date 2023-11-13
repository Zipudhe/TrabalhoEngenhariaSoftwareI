# Levantamento de requisitos
- Acesso de três tipos de usuários, Aluno de graduação, Aluno de pós graduação e professor.
- Todos os usuários podem reservar e/ou pegar um livro emprestado.
- Cada tipo de usuário tem suas regras para emprestar um livro e tempo para devolução.

## Tipos de usuários

| Tipo Usuário        | Tempo empréstimo |
|---------------------|:----------------:|
| Aluno Graduação     |  3 dias          |
| Aluno Pós-Graduação |  4 dias          |
| Professor           |  7 dias          |


# Comandos

## Empreśtimo

**Comando**:  ```'emp' + codUsuário + codLivro```

### Regras: 

**Para alunos:**
- Se houver disponibilidade de algum exemplar daquele livro na biblioteca;
- Se usuário não estiver “devedor” de um livro em atraso; 
- Se forem obedecidas as regras específicas daquele tipo de usuário quanto a quantidade de livros que pode ser pegos;
- A quantidade de reservas existentes do livro for menor do que a quantidade de exemplares disponíveis, caso o usuário não tenha reservado para ele;
- A quantidade de reservas for maior ou igual a de exemplares, mas uma das reservas é do usuário;
- Se o usuário não tiver nenhum empréstimo em curso de um exemplar daquele mesmo livro.

#### Tabela empréstimo
| Tipo Usuário        | Limite empréstimo|
|---------------------|:----------------:|
| Aluno Graduação     |  3 Livros        |
| Aluno Pós-Graduação |  4 Livros        |

--------------------------------------------------------
 
**Para professores:**
- Se houver a disponibilidade de algum exemplar daquele livro na biblioteca;
- Se o usuário não estiver devendo devolver um livro em atraso;
- Professores podem pegar livros reservados;
- Professores não tem limite da quantidade de livros a serem empretados;

## Devolução

**Comando:** ``` 'dev' + codUsuario + codLivro ```

Ao final da execução esse comando deve mostrar ao usuário o status do comando e os nomes do usuário e titulo do livro que foi feita a ação.

## Reserva

**Comando:** ``` 'res' + codUsuario + codLivro ```

Ao final da execução esse comando deve mostrar ao usuário o status do comando e os nomes do usuário e titulo do livro que foi feita a ação.

### Regras:
**Para alunos:**
- Limite de reserva de 3 livros.

## Observação

**Comando:** ``` 'obs' + codUsuario + codLivro ```

Permite que professores registrem que querem observar toda vez que determinado livro tiver mais de duas reservas simultâneas.

Não há necessidade de checar se o código do usuário se refere realmente a um professor.

 
## Consulta livro

**Comando:** ``` 'liv' + codLivro ```

Formato da resposta da consulta deve ser a seguinte:

``` 
------------------------
  Titulo: ....
  Quantidade Reservas: ....
    - Nome Fulano;
    - Nome Beltrana;
------------------------
Exemplares:
  - CodigoDoExemplar
    - Status: Disponível\Emprestado
    -? Usuario....
    -? DataEmpréstimo
    -? DataDevolução
-----------------------------------
  - CodigoDoExemplar
    - Status: Disponível\Emprestado
    -? Usuario....
    -? DataEmpréstimo
    -? DataDevolução
```


obs: Os campos com "?" só aparecem em caso do exemplar não estar disponível


## Consulta usuário

**Comando:** ``` 'usu' + codUsuario ```

Formato da resposta da consulta deve ser a seguinte:
``` 
------------------------
  Código: ....
  Nome: ....
------------------------
Empréstimos:
  - Titulo: .....
  - DataEmprestimo: ....
  - Status: Em curso/Finalizado
  - DataDevolução: ....
-----------------------------------
  - Titulo: .....
  - DataEmprestimo: ....
  - Status: Em curso/Finalizado
  - DataDevolução: ....
-----------------------------------
```

## Consulta Notificações

**Comando:** ``` 'ntf' + codUsuario ```

Consulta da quantidade de notificações que o professor recebeu

Formato da resposta:
```
  ---------------
  CodLivro: ....
  Titulo: ....
  Notificacoes: ....
  --------------
  CodLivro: ....
  Titulo: ....
  Notificacoes: ....
  --------------
```