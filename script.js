//Переменные для работы
const btnAdd = document.querySelector('.сomponents_btn');
const input = document.querySelector('.сomponents_input');
const list = document.querySelector('.wrapper_list');
//

let arrayList = []; // массив для элементов списка

if (localStorage.getItem('listElement')) {   // выгружаем из хранилища localStorage
    arrayList = JSON.parse(localStorage.getItem('listElement')); // парсим данные со строки
    console.log(arrayList); // проверка в консоли что данные перешли с типа строки в объект итерируемый
}

arrayList.forEach( (el) => {
    list.insertAdjacentHTML('beforeend', repeatHTML(el) );
    render();
}) // перебор элементов после вызова с хранилища localStorage


function render() {
    
    list.innerHTML = '';
    
    if (arrayList.length === 0) { // создание элемента с текстом с условием
        let spanText = document.createElement('span');
        spanText.className = 'wrapper_text';
        spanText.innerHTML = 'Список пуст!';
        list.appendChild(spanText);
    }
    
    for ( let i = 0; i < arrayList.length; i++ ) { // перебор всех элементов в массиве
        list.insertAdjacentHTML('beforeend', repeatHTML(arrayList[i], i));
    }
    localStorage.setItem('listElement', JSON.stringify(arrayList)); // сохранение в localStorage
}

btnAdd.addEventListener('click', () => { // обработчик на кнопку Добавить 
    
    if (input.value.length === 0) {
        return
    }
    
    let arrayObj = {  // шаблон объекта для заполнения в массив arrayList
        title: input.value,
        completed: false,
    }
    
    arrayList.push(arrayObj); // добавление объекта в массив arrayList
    input.value = '';
    render();
});

list.addEventListener('click', (event) => { // Обработчик события на кнопки состояния списка
    if (event.target.dataset.index) { // условие при наличии индекса (true)
        const index = Number(event.target.dataset.index); // из строки в число
        const type = event.target.dataset.type;
        
        if (type === 'toogle') { // условие по data-атрибутам 
            arrayList[index].completed = !arrayList[index].completed;
        } else if (type === 'delete') {
            arrayList.splice(index, 1);
        }
        render();
    }
});

function repeatHTML(array, index) { // рефакторинг повтора кода, с аргументами: массив, индекс. 
    return `
<li class="${array.completed ? 'wrapper_elem-color' : ''}  wrapper_elem">
    <span class="${array.completed ? 'text-color-cross-out' : 'elem-text'} " >${array.title}</span>
    <div class="wrapper_btns">
        <button class="${array.completed ? 'highlightDone' : 'highlight'} " data-index="${index}" data-type="toogle">✔</button>
        <button data-index="${index}" data-type="delete" class="delete">✖</button>
    </div>
</li>` // динамичное изменение шаблона
}





































