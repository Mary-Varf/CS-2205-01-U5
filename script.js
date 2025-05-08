const addTask = (taskInput, tasksContainer) => {
    let text = taskInput.value.trim();

    if (text !== "") {
        const newTask = createTask(text);
        tasksContainer.appendChild(newTask);
        taskInput.value = "";
    }

    text = "";
}

const editTask = (label) => {
    const newText = prompt("Edit your task:", label.textContent);
    if (newText !== null && newText.trim() !== "") {
        label.textContent = newText;
    } else if (newText == null){
        return;
    } else {
        editTask(label);
    }
}

const removeTask = (taskDiv) => {
    taskDiv.classList.add('fade-out');
    setTimeout(() => {
        taskDiv.remove();
    }, 500)
}

const createTask = (text) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");

    const taskId = "task" + Date.now();

    taskDiv.innerHTML = `
        <input type="checkbox" id="${taskId}" name="${taskId}">
        <label for="${taskId}">${text}</label>
        <div class="flex-row">
            <button class="btn btn--red editBtn">Edit</button>
            <button class="btn btn--red removeBtn">Remove</button>
        </div>
    `;

    const checkbox = taskDiv.querySelector("input[type='checkbox']");
    const label = taskDiv.querySelector("label");
    const editBtn = taskDiv.querySelector(".editBtn");
    const removeBtn = taskDiv.querySelector(".removeBtn");

    checkbox.addEventListener("change", () => {
        label.classList.toggle("checked", checkbox.checked);
    });

    editBtn.addEventListener("click", () => {
        editTask(label);
    });

    removeBtn.addEventListener("click", () => {
        removeTask(taskDiv);
    });

    return taskDiv;
}

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const tasksContainer = document.getElementById("tasks");

    addBtn.addEventListener("click", () => addTask(taskInput, tasksContainer));
});