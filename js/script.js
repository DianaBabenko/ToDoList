let tasks = [];
let localStorageString = localStorage.getItem('tasks');

if (localStorageString !== null) {
    tasks = JSON.parse(localStorageString);
}

let activeIndex = null;

function addTask() {
    let taskNameEl = document.getElementById('inputTask');
    let task = taskNameEl.value;

    if (activeIndex === null) {
        tasks.push(task);
    } else {
        tasks[activeIndex] = task;
    }

    taskNameEl.value = '';

    activeIndex = null;
    document.getElementById('addButton').innerText = 'Create';

    generateList(tasks);
    updateList();
}

function generateList (){
    let list = document.createElement('ul');
    list.className = "list";

    for (let todoIndex in tasks) {
        let todoEl = document.createElement('li');
        let nameOfTask = document.createElement('span');
        nameOfTask.className = "task";

        nameOfTask.innerText = tasks[todoIndex];
        todoEl.append(nameOfTask);

        let removeButton = document.createElement('button');
        removeButton.className = "closeBtn";
        removeButton.innerText = 'X';

        nameOfTask.onclick = () => {
            edit(todoIndex);
        };

        removeButton.onclick = () => {
            removeTask(todoIndex);
        };

        todoEl.append(removeButton);
        list.append(todoEl);
    }
    let todoListDiv = document.getElementById('todo-list');

    todoListDiv.innerHTML = '';
    todoListDiv.append(list);
}

function updateList () {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function edit(index){
    activeIndex = index;
    document.getElementById('inputTask').value = tasks[activeIndex];
    let addButton = document.getElementById('addButton');
    addButton.innerText = 'Save';
}

function removeTask (index){
    for (let item in tasks) {
        if (index === item) {
            tasks.splice(index, 1);
        }
    }
    //console.log(tasks);
    generateList(tasks);
    updateList();
}
generateList();