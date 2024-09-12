document.addEventListener('DOMContentLoaded', function() {
    // Mostra a div "new-item" ao clicar no botão "create-todo"
    document.querySelector('.create-todo').addEventListener('click', function(){
        document.querySelector('.new-item').style.display = 'block';
    });

    // Adiciona um novo item à lista ao clicar no botão de salvar
    document.querySelector('.new-item button').addEventListener('click', function(){
        var itemName = document.querySelector('.new-item input').value;
        
        // Validação para garantir que o item não está vazio
        if (itemName.trim() === '') {
            alert('Ops! O item não pode estar vazio!');
            return;
        }
        
        // Sanitização da entrada para evitar XSS
        itemName = sanitizeInput(itemName);
        
        var items = localStorage.getItem('todo-items');
        
        // Se não houver itens salvos, inicializa um array vazio
        var itemsArr = items ? safelyParseJSON(items) : []; 

        // Verifica se o array foi corretamente parseado
        if (!itemsArr) {
            alert("Erro ao carregar dados do localStorage.");
            return;
        }

        itemsArr.push({"item": itemName, "status": 0});
        saveItems(itemsArr);
        fetchItems();

        document.querySelector('.new-item input').value = '';
        document.querySelector('.new-item').style.display = 'none';
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
        var itemsArr = items ? safelyParseJSON(items) : [];

        if (!itemsArr) {
            console.error("Erro ao carregar os itens.");
            return;
        }

        for (var i = 0; i < itemsArr.length; i++) {
            var status = '';
            if (itemsArr[i].status === 1) {
                status = 'class="done"';
            }
            newItemHTML += `<li data-itemindex="${i}" ${status}><span class="item">${itemsArr[i].item}</span><div><span class="itemComplete">✅</span><span class="itemDelete">🗑️</span></div></li>`;
        }
        itemsList.innerHTML = newItemHTML;

        // Limpa event listeners antigos antes de adicionar novos
        document.querySelectorAll('ul li').forEach((li) => {
            const completeButton = li.querySelector('.itemComplete');
            const deleteButton = li.querySelector('.itemDelete');
            
            completeButton.replaceWith(completeButton.cloneNode(true));
            deleteButton.replaceWith(deleteButton.cloneNode(true));
            
            li.querySelector('.itemComplete').addEventListener('click', function() {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemComplete(index);
            });

            li.querySelector('.itemDelete').addEventListener('click', function() {
                var index = this.parentNode.parentNode.dataset.itemindex;
                itemDelete(index);
            });
        });
    } catch (e) {
        console.error("Erro ao carregar os itens:", e);
    }
}


function itemComplete(index) {
    var items = localStorage.getItem('todo-items'); 
    var itemsArr = items ? safelyParseJSON(items) : [];

    // Verifica se o status é 0 e altera para 1, se estiver dentro dos limites permitidos
    if (itemsArr[index].status === 0) {
        itemsArr[index].status = 1;
        saveItems(itemsArr);

        document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className = 'done';
    } else {
        console.error("Status inválido. Apenas 0 e 1 são permitidos.");
    }
}

function itemDelete(index) {
    var items = localStorage.getItem('todo-items'); 
    var itemsArr = items ?safelyParseJSON(items) : [];

    if (!itemsArr) return;

    // Remove o item do array
    itemsArr.splice(index, 1);

    // Salva os itens atualizados
    saveItems(itemsArr);

    fetchItems();
}

function saveItems(obj) {
    // Filtra os itens, garantindo que status seja apenas 0 ou 1
    var filteredItems = obj.filter(item => item.item.trim() !== '' && (item.status === 0 || item.status === 1));

    // Salva apenas os itens filtrados
    var string = JSON.stringify(filteredItems);
    localStorage.setItem('todo-items', string);
}

function safelyParseJSON(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error("Erro ao parsear JSON:", e);
        return null;
    }
}

function sanitizeInput(input) {
    // Verifica se a string já contém entidades HTML escapadas
    const containsEscapedCharacters = /&(?:amp|lt|gt|quot|#39|#x2F|#x60|#x3D);/.test(input);
    
    // Se já estiver escapado, retorna a string inalterada
    if (containsEscapedCharacters) {
        return input;
    }

    // Cria um mapa de substituição para caracteres que precisam ser escapados
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    // Substitui cada caractere do mapa por sua versão segura
    return input.replace(/[&<>"'/`=]/g, function (char) {
        return map[char];
    });
}

