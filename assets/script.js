let todoContainer = document.querySelector('.todo-container');
let addBtn = document.querySelector('.add-btn');
let list = [];
if(retrieveData() === null){
    list =[
        {
            todoName: 'Reading Book',
            checkbox: false
        },
        {
            todoName: 'Coding',
            checkbox: true
        },
        {
            todoName: 'Wash Clothes',
            checkbox: false
        },
    ]
}else{
    list = retrieveData();
}


// localStorage.removeItem('list');
console.log(list.length);

allBtn();
activeBtn();
clearCompletedBtn();
completedBtn();
addTodo();
keyListener();
renderList(list);

// Save data
function saveData(list){
    localStorage.setItem('list',JSON.stringify(list));
}
// Retrieve data
function retrieveData(){
    return JSON.parse(localStorage.getItem('list'));
}
function renderList(list){
    todoContainer.innerHTML = ''; // Clear the container incase of re-render;
    
    sort(); // Sort (unchecked) to (checked)

    // Re-render list content
    list.forEach((item, index)=>{
        addContent(item,index);
    })
    todoCount(); 
    themeBtn();
}


function addContent(item,index){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoContainer.appendChild(todoDiv)
        // addRemoveEventListener(todoDiv);

        const todoName = document.createElement('div');
        todoName.classList.add('todo-name');
        todoDiv.appendChild(todoName);

        const labelContainer = document.createElement('label');
        labelContainer.classList.add('checkbox-container');
        labelContainer.setAttribute("for", `todoItem${index}`);
        todoName.appendChild(labelContainer);

        const inputCheckbox = document.createElement('input');
        inputCheckbox.type = "checkbox";
        inputCheckbox.checked = item.checkbox;
        inputCheckbox.id = `todoItem${index}`;
        inputCheckbox.classList.add('chck');
        labelContainer.appendChild(inputCheckbox);
        
        const spanForCheck = document.createElement('span');
        labelContainer.appendChild(spanForCheck);

        const spanTodoName = document.createElement('span');
        spanTodoName.classList.add('name')
        spanTodoName.setAttribute("contenteditable", "true");
        spanTodoName.innerHTML = item.todoName;
        todoName.appendChild(spanTodoName);

        const deleteBtnSpan = document.createElement("span");
        todoDiv.appendChild(deleteBtnSpan);


        const deleteBtnImage = document.createElement("img");
        deleteBtnImage.classList.add("del-btn");
        deleteBtnImage.setAttribute("src", "./assets/delete.png");
        deleteBtnImage.setAttribute("alt", "");
        deleteBtnSpan.appendChild(deleteBtnImage);

        delBtn(index);
        checkBoxListener(index);
}

// When checkbox is checked it will 
function checkBoxListener(index){
    let checkBox2 = document.querySelectorAll('.chck');
    checkBox2[index].addEventListener('change',()=>{
        console.log(checkBox2[index].checked);
        list[index].checkbox = checkBox2[index].checked;
        saveData(list);
        renderList(list);
    })
}
// Delete todo list
function delBtn(index){
    let del = document.querySelectorAll('.del-btn');
    
    del[index].addEventListener('click',()=>{
            toDelete(index);
            del[index].removeEventListener('click',toDelete);
    })
}
function toDelete(index){
    let todo = document.querySelectorAll('.todo');
    
    console.log('Deleted');
    todo[index].remove();
    list.splice(index,1);
    todoCount();
    saveData(list);
    renderList(list);
}
// Add todo list
function addTodo(){
    let getInput = document.querySelector('#input-js');
    addBtn.addEventListener('click',()=>{
        let newTodo = {
            todoName: getInput.value,
            checkbox: false
        }
        list.push(newTodo);
        saveData(list);
        getInput.value = '';
        addContent(newTodo,todoContainer.childElementCount);
        todoCount();
    })
}



// Todo list counter
function todoCount(){
    let count = document.querySelector('.todo-counter');
    count.innerHTML = `${todoContainer.childElementCount} Item/s left`;
}


// Sort to not complete to completed
function sort(){
    list.sort((a, b) => (a.checkbox === b.checkbox ? 0 : a.checkbox ? 1 : -1));
}


// Display all list when all button is clicked
function allBtn(){
    let allBtn = document.querySelector('.all-btn');
    allBtn.addEventListener('click',()=>{
        renderList(list);
    })
}


// Display only the not completed(unchecked) list when active button is clicked
function activeBtn(){
    let actBtn = document.querySelector('.act-btn');
    actBtn.addEventListener('click',()=>{
        let actTemporary = list.filter(item => !item.checkbox);
        renderList(actTemporary);
    })
// Display only the completed(checked) list when active button is clicked    
}
function completedBtn(){
    let compBtn = document.querySelector('.comp-btn');
    compBtn.addEventListener('click',()=>{
        let compTemporary = list.filter(item => item.checkbox);
        renderList(compTemporary);
    })
    
}
// Remove all checked todo list
function clearCompletedBtn(){
    let clearCompBtn = document.querySelector('.clear-btn');
    clearCompBtn.addEventListener('click',()=>{
        list = list.filter(item => !item.checkbox);
        renderList(list);
        saveData(list)
    })
}
function keyListener(){
    window.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
            addBtn.click();
        }
    })
}


// function lightMode(){
//     let lightModeBtn = document.querySelector('.light-mode');
// }

function themeBtn(){
    let light = false;
    let lightModeBtn = document.querySelector('.light-mode');
    let lightModeIMG = document.querySelector('.background');
    lightModeBtn.addEventListener('click',()=>{
        if(!light){
            // Light Mode
            lightModeBtn.style.filter = "brightness(1) invert(0)";
            lightMode();
            
            light = true;
        }else{
            // Dark Mode
            lightModeBtn.style.filter = "brightness(0) invert(1)";
            darkMode();
            light = false;
        }
    })
}
darkMode();
// lightMode();
function lightMode(){
    document.querySelector('.background').style.backgroundImage = "url(./assets/whiteBackground.jpg)";
    console.log('light mode on');
    document.querySelector('body').style.backgroundColor = 'white';
    document.querySelector('.title-name').style.color = 'black';
    document.querySelector('.add-list-container').style.backgroundColor = '#f9f6f2';
    document.querySelector('#input-js').style.backgroundColor = '#f9f6f2';
    document.querySelector('#input-js').style.color = 'black';
    document.querySelector('.todo-container').style.backgroundColor = '#f9f6f2';
    let todos = document.querySelectorAll('.todo');
    todos.forEach((todo)=>{
        todo.style.backgroundColor = '#f9f6f2';
        todo.style.color = 'black';
    })
    document.querySelector('.add-btn').style.filter = "brightness(1) invert(0)";
    document.querySelector('.indicator').style.backgroundColor = '#f9f6f2';
}

function darkMode(){
    document.querySelector('.background').style.backgroundImage = "url(./assets/nice-business-desk-black-background.jpg)";
    console.log('light mode on');
    document.querySelector('body').style.backgroundColor = 'black';
    document.querySelector('.title-name').style.color = 'white';
    document.querySelector('.add-list-container').style.backgroundColor = '#05121A';
    document.querySelector('#input-js').style.backgroundColor = '#05121A';
    document.querySelector('#input-js').style.color = 'white';
    document.querySelector('.add-btn').style.filter = "brightness(0) invert(1)";
    let todos = document.querySelectorAll('.todo');
    todos.forEach((todo)=>{
        todo.style.backgroundColor = '#05121A';
        todo.style.color = 'white';
    })
    document.querySelector('.todo-container').style.backgroundColor = '#05121A';
    document.querySelector('.indicator').style.backgroundColor = '#05121A';
}