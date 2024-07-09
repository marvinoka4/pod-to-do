$(document).foundation()

let taskForm = document.getElementById('taskForm');
let taskTitle = document.getElementById("taskTitle");
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


let todos = [{}];

let getTodo = () => {
    todos["title"] = taskTitle.value;
    todos["date"] = taskDueDate.value;
    todos["content"] = taskContent.value;

    createTodo();
}


let createTodo = () => {
    allTasks.innerHTML += `
        <div class="callout">
            <div class="grid-x grid-padding-x">
                <div class="cell medium-12">
                    <p><span>
                        <input id="task1" type="checkbox"/><label for="task1"><strong>${todos.title}</strong></label>
                    </span></p>
                </div>
                <div class="cell medium-12">
                    <p>
                        <span>${todos.date}</span>
                    </p>
                </div>
                <div class="cell medium-12">
                    <p>${todos.content}</p>
                </div>
                <div class="cell medium-12">
                    <div class="button-group hollow align-spaced options">
                        <a class="button secondary">
                            <i class="fa fa-edit" aria-hidden="true"></i>
                        </a>
                        <a class="button alert">
                            <i class="fa fa-trash" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    resetForm();
};


let resetForm = () => {
    taskTitle.value = "";
    taskDueDate.value = "";
    taskContent.value = "";
};