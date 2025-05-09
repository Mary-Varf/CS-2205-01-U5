const addTask = (taskInput, tasksContainer) => {
    const text = taskInput.value.trim();

    if (text !== "") {
        const newTask = createTask(text);
        tasksContainer.appendChild(newTask);
        taskInput.value = "";
    }
};

const editTask = (label) => {
    const newText = prompt("Edit your task:", label.textContent);
    if (newText !== null && newText.trim() !== "") {
        label.textContent = newText;
    } else if (newText == null) {
        return;
    } else {
        editTask(label);
    }
};

const removeTask = (taskDiv) => {
    taskDiv.classList.add('fade-out');
    setTimeout(() => {
        taskDiv.remove();
    }, 500);
};

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

    return taskDiv;
};

document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addBtn = document.getElementById("addBtn");
    const tasksContainer = document.getElementById("tasks");

    addBtn.addEventListener("click", () => addTask(taskInput, tasksContainer));

    tasksContainer.addEventListener("click", (e) => {
        const target = e.target;
        const taskDiv = target.closest(".task");

        if (!taskDiv) return;

        if (target.classList.contains("editBtn")) {
            const label = taskDiv.querySelector("label");
            editTask(label);
        }

        else if (target.classList.contains("removeBtn")) {
            removeTask(taskDiv);
        }

        else if (target.matches("input[type='checkbox']")) {
            const label = taskDiv.querySelector("label");
            label.classList.toggle("checked", target.checked);
        }
    });
});
