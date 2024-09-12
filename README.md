# ChromeExtension-ToDoList

# To-Do List Application
Este é um aplicativo de lista de tarefas desenvolvido como uma extensão do Google Chrome utilizando JavaScript. A extensão permite aos usuários adicionar, completar e excluir itens da lista de tarefas, com os dados sendo armazenados localmente no navegador para persistência.

Este projeto foi baseado no tutorial [Coding Challenge 4 Extensions In 2 Hours - How to build a Chrome Extension], com melhorias na interface de usuário e na segurança.

## Funcionalidades
- Adicionar Tarefa: Exibe um formulário para adicionar uma nova tarefa.
- Completar Tarefa: Marca uma tarefa como concluída.
- Excluir Tarefa: Remove uma tarefa da lista.
- Persistência: Salva as tarefas no `localStorage` do navegador, garantindo que as tarefas permaneçam após recarregar a página.
- Segurança: Sanitização de entradas para evitar ataques de XSS.

## Estrutura do Código
### Inicialização
Quando o documento é carregado (`DOMContentLoaded`), o código:
- Adiciona um listener ao botão `create-todo` para exibir o formulário `new-item`.
- Adiciona um listener ao botão de salvar no formulário para adicionar a tarefa à lista e esconder o formulário.
- Carrega as tarefas salvas do `localStorage`.

### Adicionar Tarefa
Quando o botão de salvar é clicado:
- O nome da tarefa é recuperado do campo de entrada.
- Se o nome da tarefa não estiver vazio, a tarefa é adicionada ao `localStorage` e exibida na interface.
- A entrada é sanitizada para prevenir atarques de XSS.

### Exibir Tarefas
A função `fetchItems()`:
- Recupera e analisa a lista de tarefas do `localStorage`.
- Atualiza a lista de tarefas exibida na interface.
- Adiciona listeners para as ações de completar e excluir tarefas.

### Completar Tarefa
A função `itemComplete(index)`:
- Marca a tarefa no índice fornecido como concluída.
- Atualiza a interface e o `localStorage`.
  
### Excluir Tarefa
A função `itemDelete(index)`:
- Remove a tarefa do índice fornecido.
- Atualiza a interface e o `localStorage`.
  
### Persistência
A função `saveItems(obj)`:
- Converte a lista de tarefas em uma string JSON.
- Salva a string no `localStorage`.

## Exemplo de Uso
### Adicionar uma tarefa:
- Clique no botão "New Item" para exibir o campo de entrada
- Insira a tarefa no campo de entrada e clique no botão de "Save".

### Completar uma tarefa:
- Clique no ícone de verificação ✅ ao lado da tarefa.

### Excluir uma tarefa:
- Clique no ícone de lixeira 🗑️ ao lado da tarefa.

## Requisitos
- Navegador Google Chrome;
- Navegador deve permitir o uso de `localStorage`.

## Segurança
Para evitar vulnerabilidades de Cross-Site Scripting (XSS), o projeto implementa uma função de sanitização de entradas que espaca caracteres especiais como `&`, `<`,`>`, `"` e outros.
