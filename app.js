//Selectors: declaring variables that select the elements needed from the DOM
const toDoInput = document.querySelector('.to-do-input');
const toDoButton = document.querySelector('.to-do-button');
const toDoList = document.querySelector('.to-do-list');
const filterOption = document.querySelector(`.filter-to-do`)


//Event listeners 
/* 
    When an event occurs (click), the corresponding variable (toDoButton) executes the function (addToDo)
    variable.addEventListener('event', function)
*/
document.addEventListener('DOMContentLoaded', getToDos);
toDoButton.addEventListener('click', addToDo);
toDoList.addEventListener(`click`, deleteCheck);
filterOption.addEventListener(`click`, filterToDo);


//Functions
function addToDo(event) {
    //Prevent from submitting (refreshing the page)
    event.preventDefault();
    //Create to-do div to add new activity <li>, a check button and a delete button. Push it to DOM.
    const toDoDiv = document.createElement(`div`);
    toDoDiv.classList.add(`to-do`);
    //Create <li>
    const newToDo = document.createElement(`li`);
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add(`to-do-item`);
    toDoDiv.appendChild(newToDo);
    //Add to do to local storage
    saveLocalToDos(toDoInput.value)
    //Check mark button
    const completedButton = document.createElement(`button`);
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("completed-button");
    toDoDiv.appendChild(completedButton); 
    //Trash button
    const trashButton = document.createElement(`button`);
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-button");
    toDoDiv.appendChild(trashButton);
    //APPEND TO DOM LIST
    toDoList.appendChild(toDoDiv);
    //Clear to-do input value
    toDoInput.value = "";         
}

function deleteCheck(e) {
    const item = e.target;
    //Delete to-do
    if (item.classList[0] === "trash-button") {
        const toDo = item.parentElement
        //Here goes the animation
        toDo.classList.add('fall');
        removeLocalToDos(toDo);
        toDo.addEventListener('transitionend', ()=>{toDo.remove()});
    }
    //Check mark
    if (item.classList[0] === "completed-button") {
        item.parentElement.classList.toggle(`completed`);
    }
}

function filterToDo (e) {
    const  toDos = toDoList.childNodes;
    toDos.forEach(function (todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(todo.classList.contains('completed')!=true) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

function saveLocalToDos(toDo) {
    //Check--Hey do I have already things in there
    let toDos;
    if(localStorage.getItem('toDos') === null){
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    toDos.push(toDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
}

function getToDos() {
    //Check--Hey do I have already things in there
    let toDos;
    if(localStorage.getItem('toDos') === null){
        toDos = [];
    } else {
        toDos = JSON.parse(localStorage.getItem('toDos'));
    }
    toDos.forEach((todo)=>{
        //Create to-do div to add new activity <li>, a check button and a delete button. Push it to DOM.
        const toDoDiv = document.createElement(`div`);
        toDoDiv.classList.add(`to-do`);
        //Create <li>
        const newToDo = document.createElement(`li`);
        newToDo.innerText = todo;
        newToDo.classList.add(`to-do-item`);
        toDoDiv.appendChild(newToDo);
        //Check mark button
        const completedButton = document.createElement(`button`);
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("completed-button");
        toDoDiv.appendChild(completedButton); 
        //Trash button
        const trashButton = document.createElement(`button`);
        trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
        trashButton.classList.add("trash-button");
        toDoDiv.appendChild(trashButton);
        //APPEND TO DOM LIST
        toDoList.appendChild(toDoDiv);
    })
}

function removeLocalToDos (todo) {
        //Check--Hey do I have already things in there
        let toDos;
        if(localStorage.getItem('toDos') === null){
            toDos = [];
        } else {
            toDos = JSON.parse(localStorage.getItem('toDos'));
        }
        const toDoIndex = todo.children[0].innerText;
        toDos.splice(toDos.indexOf(toDoIndex), 1);
        localStorage.setItem('toDos', JSON.stringify(toDos));
}