<<<<<<< HEAD
# ChromeExtension-ToDoList
=======
# To-Do List Application
Este é um aplicativo de lista de tarefas desenvolvido como uma extensão do Google Chrome utilizando JavaScript. A extensão permite aos usuários adicionar, completar e excluir itens da lista de tarefas, com os dados sendo armazenados localmente no navegador para persistência.

Desenvolvido com base no vídeo "Coding Challenge 4 Extensions In 2 Hours - How to build a Chrome Extension", o projeto inclui melhorias significativas na interface, realizadas por meio de CSS.

## Funcionalidades
- Adicionar Tarefa: Exibe um formulário para adicionar uma nova tarefa.
- Completar Tarefa: Marca uma tarefa como concluída.
- Excluir Tarefa: Remove uma tarefa da lista.
- Persistência: Salva e carrega as tarefas usando o `localStorage`.

## Estrutura do Código
### Inicialização
Quando o documento é carregado (`DOMContentLoaded`), o código:
- Adiciona um listener ao botão `create-todo` para exibir o formulário `new-item`.
- Adiciona um listener ao botão de salvar no formulário para adicionar a tarefa à lista e esconder o formulário.
- Carrega as tarefas salvas do localStorage.

### Adicionar Tarefa
Quando o botão de salvar é clicado:
- O nome da tarefa é recuperado do campo de entrada.
- Se o nome não estiver vazio, a tarefa é adicionada ao localStorage.
- O formulário é escondido e o campo de entrada é limpo.

### Exibir Tarefas
A função `fetchItems()`:
- Recupera e analisa a lista de tarefas do localStorage.
- Atualiza a lista de tarefas exibida na interface.
- Adiciona listeners para as ações de completar e excluir tarefas.

### Completar Tarefa
A função `itemComplete(index)`:
- Marca a tarefa no índice fornecido como concluída.
- Atualiza a interface e o localStorage.
### Excluir Tarefa
A função `itemDelete(index)`:
- Remove a tarefa do índice fornecido.
- Atualiza a interface e o localStorage.
### Salvar Itens
A função `saveItems(obj)`:
- Converte a lista de tarefas em uma string JSON.
- Salva a string no `localStorage`.

## Exemplo de Uso
### Adicionar uma tarefa:
- Clique no botão `New Item`para exibir o campo de entrada
- Insira a tarefa no campo de entrada e clique no botão de `Save`.

### Completar uma tarefa:
- Clique no ícone de verificação ✅ ao lado da tarefa.

### Excluir uma tarefa:
- Clique no ícone de lixeira 🗑️ ao lado da tarefa.

## Requisitos
Navegador Google Chrome;
Navegador deve permitir o uso de `localStorage`.
>>>>>>> c212482c23687bea09e7153e18e440ffc069f2c9
