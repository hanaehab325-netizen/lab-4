"use strict";
const input = document.getElementById("todoInput");
const addBtn = document.getElementById("add");
const list = document.getElementById("todoList");
const count = document.getElementById("count");
const allBtn = document.getElementById("all");
const activeBtn = document.getElementById("active");
const completedBtn = document.getElementById("completed");
const clearCompletedBtn = document.getElementById("clearCompleted");
const clearAllBtn = document.getElementById("clearAll");
let todos = [];
let filter = "all";
function addTodo() {
    const text = input.value.trim();
    if (text === "") {
        return;
    }
    todos.push({
        text: text,
        completed: false
    });
    input.value = "";
    render();
}
function render() {
    list.innerHTML = "";
    let shownTodos = todos;
    if (filter === "active") {
        shownTodos = todos.filter(todo => todo.completed === false);
    }
    if (filter === "completed") {
        shownTodos = todos.filter(todo => todo.completed === true);
    }
    shownTodos.forEach(todo => {
        const li = document.createElement("li");
        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.onclick = () => {
            todo.completed = checkbox.checked;
            render();
        };
        // Todo text
        const text = document.createElement("span");
        text.textContent = todo.text;
        text.className = "todo-text";
        if (todo.completed) {
            text.classList.add("completed");
        }
        // Double click to edit
        text.ondblclick = () => {
            const editInput = document.createElement("input");
            editInput.value = todo.text;
            editInput.className = "editInput";
            li.replaceChild(editInput, text);
            editInput.focus();
            editInput.onkeydown = (event) => {
                if (event.key === "Enter") {
                    if (editInput.value.trim() !== "") {
                        todo.text = editInput.value.trim();
                    }
                    render();
                }
            };
        };
        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.className = "delete";
        deleteBtn.onclick = () => {
            todos = todos.filter(t => t !== todo);
            render();
        };
        li.appendChild(checkbox);
        li.appendChild(text);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
    const itemsLeft = todos.filter(todo => todo.completed === false).length;
    count.textContent = itemsLeft + " items left";
}
// ADD
addBtn.onclick = addTodo;
// Enter to add
input.onkeydown = (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
};
// ALL
allBtn.onclick = () => {
    filter = "all";
    setActiveButton(allBtn);
    render();
};
// ACTIVE
activeBtn.onclick = () => {
    filter = "active";
    setActiveButton(activeBtn);
    render();
};
// COMPLETED
completedBtn.onclick = () => {
    filter = "completed";
    setActiveButton(completedBtn);
    render();
};
// CLEAR COMPLETED
clearCompletedBtn.onclick = () => {
    todos = todos.filter(todo => todo.completed === false);
    render();
};
// CLEAR ALL
clearAllBtn.onclick = () => {
    todos = [];
    render();
};
// Change selected filter color
function setActiveButton(button) {
    allBtn.classList.remove("active-filter");
    activeBtn.classList.remove("active-filter");
    completedBtn.classList.remove("active-filter");
    button.classList.add("active-filter");
}
render();
