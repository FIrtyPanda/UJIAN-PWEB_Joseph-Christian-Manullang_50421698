document.addEventListener('DOMContentLoaded', function () {
    const shoppingForm = document.getElementById('shopping-form');
    const shoppingList = document.getElementById('shopping-list');
    document.getElementById("update").style.display = "none";
    let selectedItem;
    let selectedName;
    let valueItem = 
    shoppingForm.addEventListener('submit', function (e) {
        e.preventDefault();
            addItem();
        
    });

    document.getElementById("update").addEventListener('click', function (e) {
        e.preventDefault();
        updateItem(selectedItem);
    });

    shoppingList.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON') {
            if (e.target.classList.contains('delete')) {
                removeItem(e.target.parentElement);
            } else if (e.target.classList.contains('edit')) {
                editItem(e.target.parentElement);
            }
        }
    });

    function addItem() {
        const itemTypeSelect = document.getElementById('item-type');
        const itemInput = document.getElementById('item');
        const newItemType = itemTypeSelect.value;
        const newItemText = itemTypeSelect.value.trim();
        const newItemQuantity = parseFloat(itemInput.value.trim()) || 0;
        let newItemPrice;

        switch (newItemText) {
            case 'pencil-case':
                newItemPrice = 15000;
                break;
            case 'pen':
                newItemPrice = 3000;
                break;
            case 'eraser':
                newItemPrice = 2500;
                break;
            case 'ruler':
                newItemPrice = 5000;
                break;
            case 'pencil':
                newItemPrice = 2000;
                break;
            default:
                alert("Barang belom dipilih");
        }

        const totalItemPrice = newItemPrice * newItemQuantity;
        if (newItemText !== '' && newItemQuantity > 0) {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${newItemType}: ${newItemQuantity} (Harga: Rp ${newItemPrice.toLocaleString()} x ${newItemQuantity} = Rp ${totalItemPrice.toLocaleString()})</span>
                <button class="edit" onClick=${selectOption(newItemType)} >Edit</button>
                <button class="delete">Delete</button>
            `;
            li.dataset.price = newItemPrice;
            shoppingList.appendChild(li);
            clearForm();
        }
      
    }

    function removeItem(item) {
        shoppingList.removeChild(item);
        clearForm();
    }

    function selectOption(data) {
        document.getElementById("item-type").value= data;
      }

    function editItem(item){
        document.getElementById("update").style.display="inline";
        document.getElementById("submit").style.display="none";
        const span = item.querySelector('span');
        const text = span.textContent;
        let textArr = text
        
        let textFix = [];
        for(let i=0;i<textArr.length;i++){
            if(textArr[i]!= ":"){
                textFix.push(textArr[i]);
            }
            else{
                break;
            }

        }
        let strText = textFix.join("");
        console.log(strText)
        const newItemType = strText;
        document.getElementById("item").placeholder = "Edit Jumlah";
        const newItemText = document.getElementById("item").value;
        const newItemQuantity = parseFloat(newItemText) || 0;
        document.getElementById('item-type').value = newItemType.toLowerCase().replace(' ', '-');
        document.getElementById('item').value = newItemQuantity;
        selectedItem = item;
    }

    function updateItem(item) {
        const itemTypeSelect = document.getElementById('item-type');
        const itemInput = document.getElementById('item');
        const newItemType = itemTypeSelect.value;
        const newItemText = itemInput.value.trim();
        const newItemQuantity = parseFloat(itemInput.value.trim()) || 0;
        let newItemPrice;

        switch (newItemType) {
            case 'pencil-case':
                newItemPrice = 15000;
                break;
            case 'pen':
                newItemPrice = 3000;
                break;
            case 'eraser':
                newItemPrice = 2500;
                break;
            case 'ruler':
                newItemPrice = 5000;
                break;
            case 'pencil':
                newItemPrice = 2000;
                break;
            default:
                newItemPrice = 0;
        }

        const totalItemPrice = newItemPrice * newItemQuantity;
        document.getElementById("update").style.display = "none";
        document.getElementById("submit").style.display="inline";
        if (newItemText !== '' && newItemQuantity > 0) {
            item.innerHTML = `
                <span>${newItemType}: ${newItemText} (Harga: Rp ${newItemPrice.toLocaleString()} x ${newItemQuantity} = Rp ${totalItemPrice.toLocaleString()})</span>
                <button class="edit" onClick=${selectOption(newItemType)}>Edit</button>
                <button class="delete">Delete</button>
            `;

            item.dataset.price = newItemPrice;
            clearForm();
            selectedItem = null;
        }
    }

    function clearForm() {
        document.getElementById('shopping-form').reset();
        selectedItem = null;
    }
});