$(document).foundation()

let taskForm = document.getElementById('taskForm');
let taskTitle = document.getElementById("taskTitle");
let taskStatus = document.getElementById("taskStatus");
let taskDueDate = document.getElementById("taskDueDate");
let taskContent = document.getElementById("taskContent");
let allTasks = document.getElementById("allTasks");
let addTask = document.getElementById("addTask");
let errorMessage = document.getElementById("errorMessage");

taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
    // let task = document.getElementById('task').value;
    // let taskList = document.getElementById('taskList');
    // let li = document.createElement('li');
    // li.textContent = task;
    // taskList.appendChild(li);
    // form.reset();
});

let validateForm = () => {
    if (taskTitle.value === "") {
        console.log("failure");
        errorMessage.innerHTML = '<i class="fa fa-exclamation" aria-hidden="true"></i> Please insert Task Title';
    } else {
        console.log("success");
        errorMessage.innerHTML = "";
        getTodo();
        addTask.setAttribute("data-close", "");
        addTask.click();

        (() => {
            addTask.removeAttribute("data-close");
        })();
    }
};

//generate random id
function getUid() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the 6 characters from position 2
    // after the decimal.
    return "_" + Math.random().toString(36).substr(2, 6);
}

console.log(getUid())//_iio3na

let todos = [];

let getTodo = () => {

    todos.push({
        id: getUid(),
        title: taskTitle.value,
        date: taskDueDate.value,
        content: taskContent.value,
        status: taskStatus.value,
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    createTodo();

};

let createTodo = () => {

    allTasks.innerHTML = "";

    todos.map((x, y) => {
        return (allTasks.innerHTML += `
        <div class="callout" id=${y}>
            <div class="grid-x grid-padding-x">
                <div class="cell medium-12">
                    <span>${x.title}</span>
                </div>
                <div class="cell medium-12">
                    <span>${x.date}</span>
                </div>
                <div class="cell medium-12">
                    <span>${x.content}</span>
                </div>
                <div class="cell medium-12 status-${x.status}" id="taskStatusCheck">
                    <span class="status-text">Status: ${x.status} <i class="fa fa-check-square" aria-hidden="true"></i></span>
                </div>
                <div class="cell medium-12">
                    <div class="button-group hollow align-spaced options">
                        <a class="button secondary" data-open="taskModal" onclick="editTodo(this)">
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </a>
                        <a class="button alert" onclick="deleteTodo(this); createTodo();">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `);
    });

    resetForm();
};

let deleteTodo = (e) => {
    e.parentElement.parentElement.parentElement.parentElement.remove();
    todos.splice(e.parentElement.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
};

let editTodo = (e) => {
    let selectedTask = e.parentElement.parentElement.parentElement.parentElement;

    taskTitle.value = selectedTask.children[0].children[0].children[0].innerHTML;
    taskDueDate.value = selectedTask.children[0].children[1].children[0].innerHTML;
    taskContent.value = selectedTask.children[0].children[2].children[0].innerHTML;

    deleteTodo(e);
};


let resetForm = () => {
    taskTitle.value = "";
    taskDueDate.value = "";
    taskContent.value = "";
};

(() => {
    todos = JSON.parse(localStorage.getItem("todos")) || []
    console.log(todos);
    createTodo();
})();