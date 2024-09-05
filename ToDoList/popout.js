// create-todo <- create todo button on click open ".new-item"
// new-item <- if button pressed it save & hide "new-item"

document.addEventListener('DOMContentLoaded', function() {
    // Mostra a div "new-item" ao clicar no botão "create-todo"
    document.querySelector('.create-todo').addEventListener('click', function(){
        document.querySelector('.new-item').style.display = 'block';
    });

    // Adiciona um novo item à lista ao clicar no botão de salvar
    document.querySelector('.new-item button').addEventListener('click', function(){
        var itemName = document.querySelector('.new-item input').value;
        if (itemName != '') {
            var items = localStorage.getItem('todo-items');
            // Se não houver itens salvos, inicializa um array vazio
            var itemsArr = items ? JSON.parse(items) : []; 
            itemsArr.push({"item": itemName, "status": 0});
            saveItems(itemsArr);
            fetchItems();
            document.querySelector('.new-item input').value = '';
            document.querySelector('.new-item').style.display = 'none';
        }
    });

    // Carrega os itens salvos no localStorage
    fetchItems();
});

function fetchItems() {
    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';
    
    try {
        var items = localStorage.getItem('todo-items'); 
        var itemsArr = items ? JSON.parse(items) : [];

        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if (itemsArr[i].status == 1) {
                status = 'class="done"';
            }
            newItemHTML += `<li data-itemindex="${i}" ${status}><span class="item">${itemsArr[i].item}</span><div><span class="itemComplete">✅</span><span class="itemDelete">🗑️</span></div></li>`;
        }
        itemsList.innerHTML = newItemHTML;

        var itemsListUL = document.querySelectorAll('ul li');
        for (var i = 0; i < itemsListUL.length; i++) {
            itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });
            itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        }
    } catch (e) {
        console.error("Erro ao carregar os itens:", e);
    }
}

function itemComplete(index) {
    var items = localStorage.getItem('todo-items'); 
    var itemsArr = items ? JSON.parse(items) : [];

    itemsArr[index].status = 1;
    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className = 'done';
}

function itemDelete(index) {
    var items = localStorage.getItem('todo-items'); 
    var itemsArr = items ? JSON.parse(items) : [];

    itemsArr.splice(index, 1);
    saveItems(itemsArr);
    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();
}

function saveItems(obj) {
    var string = JSON.stringify(obj);
    localStorage.setItem('todo-items', string);
}
